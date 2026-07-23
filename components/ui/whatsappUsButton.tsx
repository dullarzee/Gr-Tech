import Image from "next/image";

export default function WhatsappUsButton({
  phoneNumber,
}: {
  phoneNumber: number;
}) {
  return (
    <a href={`https://wa.me/${phoneNumber}`} target="_blank">
      <button
        aria-label="whatsapp button"
        className="rounded-md w-full lg:w-50 text-lg h-13 bg-green-400"
      >
        <div className="flex gap-2 justify-center">
          <Image
            alt="whatsapp logo"
            src="/images/whatsapp.svg"
            width={20}
            height={20}
            className="shrink-0 "
          />
          <span>Whatsapp us</span>
        </div>
      </button>
    </a>
  );
}
