import { db } from "@/db";
import { activities, customers } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { ApiError, checkOrigin, createSession, deleteSession, errorResponse, getSession, limitAttempts, normalizePhone, validName } from "@/lib/server";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const session = await getSession("customer");
    if (!session?.customerId) return Response.json({ member: null, activities: [] });
    const [member] = await db.select().from(customers).where(eq(customers.id, session.customerId)).limit(1);
    const history = member ? await db.select().from(activities).where(eq(activities.customerId, member.id)).orderBy(desc(activities.createdAt)).limit(50) : [];
    return Response.json({ member: member || null, activities: history }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return errorResponse(error); }
}
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    await limitAttempts(request, "member", 30);
    const body = await request.json();
    const phone = normalizePhone(body.phone);
    let [member] = await db.select().from(customers).where(eq(customers.phone, phone)).limit(1);
    if (!member) {
      if (body.mode !== "join") throw new ApiError("We couldn’t find your card. Choose ‘Join the famiglia’ to get started.", 404);
      const name = validName(body.name);
      member = await db.transaction(async (tx) => {
        const [created] = await tx.insert(customers).values({ name, phone }).onConflictDoNothing({ target: customers.phone }).returning();
        if (created) {
          await tx.insert(activities).values({ customerId: created.id, type: "joined", description: "Joined the Italiano Bari famiglia", balanceAfter: 0 });
          return created;
        }
        const [existing] = await tx.select().from(customers).where(eq(customers.phone, phone)).limit(1);
        return existing;
      });
    }
    await createSession("customer", member.id);
    return Response.json({ member });
  } catch (error) { return errorResponse(error); }
}
export async function DELETE(request: Request) {
  try { checkOrigin(request); await deleteSession("customer"); return Response.json({ ok: true }); }
  catch (error) { return errorResponse(error); }
}
