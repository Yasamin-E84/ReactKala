export default function Partner({ partners }) {
  if (!partners?.length) return null;

  return (
    <section className="mx-auto mt-6 w-full max-w-325 px-4">
      <div
        className="
          grid
          grid-cols-2
          gap-2
        "
      >
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="
              overflow-hidden
              rounded-xl
            "
          >
            <img
              src={partner.img}
              alt={partner.title}
              className="
                h-full
                w-full
                object-cover
              "
            />
          </div>
        ))}
      </div>
    </section>
  );
}