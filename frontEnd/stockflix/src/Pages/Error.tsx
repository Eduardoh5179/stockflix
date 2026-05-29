import Header from '../components/Header.tsx'
import Sidebar from '../components/Sidebar1.tsx'
import Footer from '../components/Footer.tsx'
import {useState} from 'react'

function Error() {
  const [sidebarOpen, setsidebarOpen] = useState(true)
  return (
    <>
      <div className="flex flex-col min-h-screen">

      <Header onMenuClick={() => setsidebarOpen(!sidebarOpen)}/>
      <Sidebar isOpen={sidebarOpen}/>
      <main className='h-full flex-1'>
          <section className={`${sidebarOpen ? 'ml-64': 'ml-0'} transition-all duration-300 p-6`}>
            <h2> Pagina de erro </h2>
          </section>
      </main>
      <Footer/>
    </div>
    </>
  )
}

export default Error