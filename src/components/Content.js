import { useState,useEffect } from "react"
import axios from "axios"
import { FaAngleDoubleRight } from "react-icons/fa"
import Loader from "./Loader"

const url = 'https://course-api.com/react-tabs-project'

export default function Content() {
    const [loading, setIsLoading] = useState(true)
    const [jobs, setJobs] = useState([])
    const [value, setValue] = useState(0)
    const getData = async () => {
        const res = await axios.get(url)
        console.log(res)
        setJobs(res.data)
        setIsLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])
    if (loading) return(
        <section className="section-loading">
            <><Loader /></>
        </section>
    )
    const { company,dates,duties,title } = jobs[value]
    return(
        <section className="section">
            <div className="job-center">
                <div className="btn-container">
                    {jobs.map((item, index) => (
                        <button key={index} onClick={() => setValue(index)} className={`job-btn ${index === value && 'active-btn'}`}>
                            {item.company}
                        </button>
                    ))}
                </div>
                <article className="job-info">
                    <h3>{title}</h3>
                    <h4>{company}</h4>
                    <p className="job-date">{dates}</p>
                    {duties.map((duty, index) => (
                        <div key={index} className="job-desc">
                            <FaAngleDoubleRight className="job-icon" />
                            <div>{duty}</div>
                        </div>
                    ))}
                </article>
            </div>
            <button className="btn btn-primary">more info</button>
        </section>
    )
}