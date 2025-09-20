const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Freelancer Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="cursor-pointer">🔔</span>
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src="https://via.placeholder.com/35"
            alt="profile"
            className="w-9 h-9 rounded-full"
          />
          <span className="font-medium">John Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
