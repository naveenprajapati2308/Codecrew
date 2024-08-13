import { useProblem, useSubmission } from '../../../hooks/common'
import { LineChart, PieChart } from '../../components/Common'
import InfoPage from './components/InfoPage'
import { useState, useEffect } from 'react'
import Loader from '../../../components/Loader'
import axios from 'axios'

export default function MainPage() {

  const [data , setData] = useState(null)
  const [dataForSubmissons, setDataForSubmissons] = useState(null)
  const [labelsForSubmissons, setLabelsForSubmissons] = useState(null)
  const [piechartValues, setpiechartValues] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function doStuff() {
      const response = await axios.get('/api/site/info')

      const { labels: submissionLabel, data: submissonData } = useSubmission(response.data.submissionInfo.dates)
      const values = useProblem(response.data.problems)

      setDataForSubmissons(prev => submissonData)
      setLabelsForSubmissons(prev => submissionLabel)
      setpiechartValues(prev => values)

      setData(response.data)

      setLoading(prev => false)


    }
    doStuff()
  }, [])


  if (loading) {
    return <Loader color='cyan' />
  }

  return (
    // <div className="tw-flex tw-h-screen tw-justify-center tw-items-center">
    //     <h1  className="tw-text-6xl tw-font-medium">Coming Soon {":-)"}</h1>
    // </div>

    <div className='tw-h-full tw-w-full'>
      
      <InfoPage data={data} />

      <div className="tw-h-[60vh] tw-w-[80vw] tw-relative tw-mx-auto">
        {loading ? null : <LineChart data={dataForSubmissons} labels={labelsForSubmissons} heading="Submissions for 2024" variable="Submissions" />}
      </div>
      <div className="tw-h-[40vh] tw-w-[80vw] tw-my-10 tw-relative tw-mx-auto">
        {loading ? null : <PieChart values={piechartValues} />}
      </div>

    </div>
  )
}
