
function MainLayout() {
  return (
    <div>
      <Navbar />
        <div className="container">
            <Outlet />
        </div>
      <Footer />
    </div>
  )
}

export default MainLayout
