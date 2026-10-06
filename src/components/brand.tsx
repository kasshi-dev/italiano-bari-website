import Image from "next/image";
import Link from "next/link";

export function Brand({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <Link 
      href="/" 
      aria-label="Italiano Bari home" 
      className={`brand brand-original ${compact ? "brand-compact" : ""} ${light ? "brand-light" : ""}`}
    >
      <Image 
        className="brand-logo" 
        src="/icon.svg" 
        alt="Italiano Bari · إيتاليانو باري" 
        width={96} 
        height={96} 
        priority 
      />
      {compact ? (
        <span className="brand-compact-name">Italiano Bari</span>
      ) : (
        <>
          <span className="brand-original-name">Italiano Bari</span>
          <span className="brand-original-caption">TRATTORIA · DAMMAM</span>
          <span className="tricolore" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </>
      )}
    </Link>
  );
}
