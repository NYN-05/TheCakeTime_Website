import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  Users,
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  Star
} from 'lucide-react'
import Header from '../../components/Header'

const DashboardCard = ({ icon: Icon, title, value, trend }: any) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
        <Icon className="text-primary-600" size={24} />
      </div>
      {trend && (
        <span className="text-green-600 text-sm font-semibold flex items-center">
          <TrendingUp size={16} className="mr-1" />
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
)

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const userData = localStorage.getItem('adminUser')

    if (!token || !userData) {
      router.push('/admin')
      return
    }

    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    router.push('/admin')
  }

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'custom-orders', label: 'Custom Orders', icon: MessageSquare },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - TheCakeTime</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Top Bar */}
        <div className="bg-white shadow-md">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-display font-bold text-gradient">TheCakeTime Admin</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, <strong>{user.name}</strong></span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-md min-h-screen">
            <nav className="p-4 space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            {activeTab === 'overview' && (
              <>
                <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <DashboardCard
                    icon={DollarSign}
                    title="Total Revenue"
                    value="₹2,45,890"
                    trend="+12.5%"
                  />
                  <DashboardCard
                    icon={ShoppingCart}
                    title="Total Orders"
                    value="248"
                    trend="+8.3%"
                  />
                  <DashboardCard
                    icon={Package}
                    title="Products"
                    value="64"
                  />
                  <DashboardCard
                    icon={Users}
                    title="Customers"
                    value="1,234"
                    trend="+15.2%"
                  />
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b pb-3">
                          <div>
                            <p className="font-semibold">Order #{1000 + i}</p>
                            <p className="text-sm text-gray-600">Customer Name</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                            Completed
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">Popular Products</h3>
                    <div className="space-y-4">
                      {['Chocolate Truffle', 'Red Velvet', 'Black Forest', 'Vanilla Dream', 'Butterscotch'].map((name, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <p className="font-semibold">{name}</p>
                          <span className="text-gray-600">{45 - i * 3} orders</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'products' && (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold">Products</h2>
                  <button className="btn-primary">Add New Product</button>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-gray-600">Product management interface coming soon...</p>
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <>
                <h2 className="text-3xl font-bold mb-8">Orders</h2>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-gray-600">Order management interface coming soon...</p>
                </div>
              </>
            )}

            {activeTab === 'custom-orders' && (
              <>
                <h2 className="text-3xl font-bold mb-8">Custom Orders</h2>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-gray-600">Custom order management interface coming soon...</p>
                </div>
              </>
            )}

            {activeTab === 'reviews' && (
              <>
                <h2 className="text-3xl font-bold mb-8">Reviews</h2>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-gray-600">Review moderation interface coming soon...</p>
                </div>
              </>
            )}

            {activeTab === 'users' && (
              <>
                <h2 className="text-3xl font-bold mb-8">Users</h2>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-gray-600">User management interface coming soon...</p>
                </div>
              </>
            )}

            {activeTab === 'settings' && (
              <>
                <h2 className="text-3xl font-bold mb-8">Settings</h2>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-gray-600">Settings interface coming soon...</p>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </>
  )
}
