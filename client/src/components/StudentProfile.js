// import { useState, useEffect } from "react"

// const StudentProfile = () => {
//     const [profile, setProfile] = useState(null)
//     const { student } = useParams()

//     // <Route path="/users/:userId" element={<Account user={user} />} />
//     useEffect(() => {
//         const getStudent= async () => {
//             const res = await fetch(`/api/${student}`)
//             const data = await res.json()
//             setProfile(data)
//         }
//         getStudent()
//     }, [])
// }

// const 