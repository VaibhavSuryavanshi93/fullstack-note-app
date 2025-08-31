const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div
      className="hidden lg:flex items-center justify-center bg-base-200 p-12 rounded-2xl overflow-hidden m-1"
      style={{
        backgroundImage: "url('https://picsum.photos/800/1000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "1rem",
      }}
    >
      <div className="max-w-md mt-90 text-center bg-white/40 p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
