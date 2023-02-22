import { Header } from '../components/header/Header'
import { MForm } from '../components/form'
import { MarketChart } from '../components/market_chart'
import { MTable } from '../components/table'


export default function Home() {
  return (
    <>
     <Header />
     <MForm />
     <h2>Charts</h2>
     <MTable />
    </>
  )
}
