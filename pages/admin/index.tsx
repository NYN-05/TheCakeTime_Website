import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Lock } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Admin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      // Admin authentication uses separate endpoint
      const endpoint = '/api/admin/auth/login'
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed')
      }

      // Store admin token with different key to avoid conflicts with customer tokens
      localStorage.setItem('adminToken', data.token)
      localStorage.setItem('adminUser', JSON.stringify(data.user))

      // Redirect to dashboard
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login - TheCakeTime</title>
      </Head>

      <Header />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Lock className="text-primary-600" size={32} />
              </div>
              <h1 className="text-3xl font-display font-bold mb-2">
                Admin Login
              </h1>
              <p className="text-gray-600">
                Sign in to access the dashboard
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Login
              </button>
            </form>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 bg-secondary-50 border border-secondary-200 rounded-lg p-4">
            <p className="text-sm font-semibold mb-2">Demo Credentials:</p>
            <p className="text-sm text-gray-700">Email: admin@thecaketime.com</p>
            <p className="text-sm text-gray-700">Password: admin123</p>
            <p className="text-xs text-gray-600 mt-2">Note: Admin accounts can only be created by existing administrators.</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
