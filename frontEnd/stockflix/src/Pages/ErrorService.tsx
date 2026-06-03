import Header from '../components/Header.tsx';
import Sidebar from '../components/Sidebar1.tsx';
import Footer from '../components/Footer.tsx';
import ErrorService from '../components/ErrorService.tsx';
import { useState } from 'react';


function ErrorServicePage() {
  const [sidebarOpen, setsidebarOpen] = useState(true)
  return (
    <>
      <div className="flex flex-col min-h-screen">

        <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} />
        <main className='h-full flex-1 dark:bg-zinc-950 transition-colors'>
          <section className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 p-6`}>
            <ErrorService/>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default ErrorServicePage