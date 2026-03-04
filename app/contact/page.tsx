import Header from '../components/Header'
import { Mail, MapPin } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the OpenDocs team.',
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-48 md:pb-24">
        <h1 className="font-mono text-5xl md:text-7xl font-bold tracking-tight text-primary-950 leading-[0.9] mb-6">
          Contact
        </h1>
        <p className="text-lg text-primary-400 mb-16 max-w-xl">
          Questions about the docs or API? We&apos;d love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm font-medium text-primary-900">Email</h3>
                  <p className="text-sm text-primary-400 mt-1">hello@opendocs.dev</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm font-medium text-primary-900">Location</h3>
                  <p className="text-sm text-primary-400 mt-1">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-primary-500 mb-2">Name</label>
                <input type="text" id="name" name="name" className="w-full px-0 py-2 border-0 border-b border-primary-200 focus:outline-none focus:border-accent-500 text-sm transition-colors bg-transparent" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-primary-500 mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full px-0 py-2 border-0 border-b border-primary-200 focus:outline-none focus:border-accent-500 text-sm transition-colors bg-transparent" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-primary-500 mb-2">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full px-0 py-2 border-0 border-b border-primary-200 focus:outline-none focus:border-accent-500 text-sm transition-colors resize-none bg-transparent" required />
              </div>
              <button type="submit" className="inline-block border-2 border-primary-900 text-primary-900 px-8 py-3 text-sm font-medium tracking-wide uppercase hover:bg-primary-900 hover:text-white transition-colors duration-200">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
