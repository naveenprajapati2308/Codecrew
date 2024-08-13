import { HandThumbsUpFill, HandThumbsDownFill, Bookmark , BookmarkCheckFill } from 'react-bootstrap-icons'

import UserContext from '../../../../context/UserContext'
import { useContext , useEffect, useState } from 'react'
import axios from 'axios'

export default function InfoRow({ problem , setProblem}) {

    const [liked , setLiked] = useState(false)
    const [disliked , setDisliked] = useState(false)
    const [saved , setSaved] = useState(false)

    const {user , updateUser} = useContext(UserContext)
    // console.log(user);
    
    useEffect(()=>{
        if(user.dislikedProblems.includes(problem._id)){
            setDisliked(prev => true)
        }
        else if(user.likedProblems.includes(problem._id)){
            setLiked(prev => true)
        }
        if(user.saved.includes(problem._id)){
            setSaved(prev => true)
        }
    } , [])
    
    async function handleLike(event) {
        // console.log("clicked");
        if(!liked){
            setLiked(prev => true)
            setDisliked(prev =>false)
            const {data} = await axios.put(`/api/problem/${problem._id}/like`)
            setProblem(prev => data)
            // updateUser()
        }
        else{
            const {data} = await axios.put(`/api/problem/${problem._id}/remove?remove=unlike`)
            setProblem(prev => data)
            setLiked(prev => false)
            // updateUser()
        }

        updateUser()
    }
    async function handleDislike(event) {
        // console.log("clicked");
        if(!disliked){
            setLiked(prev => false)
            setDisliked(prev => true)
            const {data} = await axios.put(`/api/problem/${problem._id}/dislike`)
            setProblem(prev => data)
            // updateUser()

        }
        else{
            const {data} = await axios.put(`/api/problem/${problem._id}/remove?remove=undislike`)
            setProblem(prev => data)            
            setDisliked(prev => false)
        }

        updateUser()
    }

    async function addToBookmark(event) {
        
        try {
            if(saved){
                setSaved(prev => false)
                await axios.put(`/api/user/unsave?problemId=${problem._id}` , {withCredentials: true})
            }
            else{
                setSaved(prev => true)
                await axios.put(`/api/user/save?problemId=${problem._id}` , {withCredentials: true})
            }
            updateUser()
        } catch (error) {
            alert(error.message)
        }
    }


    return (
        <>
            <div className="tw-flex tw-flex-wrap sm:tw-justify-between tw-items-center tw-justify-start tw-bg-gray-200 tw-p-4 tw-rounded-md">
                <div className="tw-flex sm:tw-justify-start tw-items-center tw-space-x-4">
                    <div>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-6 tw-w-6 tw-text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3.448l1.304-1.303a5.999 5.999 0 0 1 8.489 8.49l-9.793 9.794a1 1 0 0 1-1.414 0l-9.794-9.794a5.999 5.999 0 0 1 8.489-8.49L10 3.448z" clipRule="evenodd" />
                        </svg> */}
                        <button onClick={handleLike}><HandThumbsUpFill  color={liked ? "blue" : "grey"} size={30} /></button>
                    </div>
                    <div>
                        <span className="tw-font-bold tw-text-blue-500">Likes:</span> {problem.likes.length}
                    </div>
                    <div>
                        <button onClick={handleDislike}><HandThumbsDownFill color={disliked ? "red" : "grey"} size={30}  /></button>
                    </div>
                    <div>
                        <span className="tw-font-bold tw-text-red-500">Dislikes:</span> {problem.dislikes.length}
                    </div>
                    <div>
                        <button onClick={addToBookmark}><BookmarkCheckFill color={saved ? "blue" : "grey"} size={30}  /></button>
                    </div>
                </div>
                <div className="tw-flex sm:tw-flex-wrap tw-justify-start tw-items-center tw-space-x-4">
                    <div>
                        <span className="tw-font-bold tw-text-green-500">Successful Submissions:</span> {problem.acceptedSubmissions}
                    </div>

                    <div>
                        <span className="tw-font-bold tw-text-red-500">Rejected Submissions:</span> {problem.rejectedSubmissions}
                    </div>
                    <div>
                        <span className="tw-font-bold tw-text-red-500">Acceptance Rate</span> {problem.acceptanceRate}%
                    </div>
                </div>
            </div>
        </>
    )
}