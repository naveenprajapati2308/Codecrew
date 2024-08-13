import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Pill from './tailwind-components/Pill';
import {Check2Circle} from 'react-bootstrap-icons'

function Problem_card({ _id , name , intro , difficulty , createdAt , author , authorId}) {
  
  const {user} = useContext(UserContext)
  const [isPresent , setIsPresent] = useState(false)

  useEffect(()=>{
      if(user){
        if(user.solved.includes(_id)){
          setIsPresent(()=>true)
        }
      }
      else{
        setIsPresent(()=>false)
      }
  } , [user])
  
  const [forceUpdate, setForceUpdate] = useState(false);
  // Update the forceUpdate state when the user context changes
  useEffect(() => {
    setForceUpdate(prevState => !prevState);
  }, [user]);


  // return (
  //   <Card className='mt-5'>
  //     <Card.Header as="h5"><span className='tw-text-lg tw-font-semibold'>{name}</span>{" "}{isPresent && (<Badge pill bg="warning" text="dark">
  //       Solved
  //     </Badge>)}</Card.Header>
  //     <Card.Body>
  //       <Card.Title><Pill text={difficulty} mode={difficulty} /></Card.Title>
  //       <Card.Text>
  //       {intro}
  //       </Card.Text>
  //       <Link to={`/problem/${_id}`}>
  //         <Button variant="primary">Solve</Button>
  //       </Link>
  //     </Card.Body>
  //   </Card>
  // );

  return (
    <>
<div className="tw-my-16">
  <div className="tw-my-4 tw-max-w-8xl  tw-px-10 tw-py-6 tw-shadow-md dark:tw-shadow-cyan-500/50 dark:bg-[#212529] dark:tw-text-white">
    <div className="tw-flex tw-items-center tw-justify-between">
      <span className="tw-font-light tw-text-gray-600 dark:tw-text-white">{createdAt}</span>
      <Pill text={difficulty} mode={difficulty} />
    </div>
    <div className="tw-mt-2">
      {/* <a className="tw-text-2xl tw-font-bold tw-text-gray-700 dark:tw-text-white hover:tw-text-gray-600" href="#">{name}</a> */}
      <Link className="tw-text-2xl tw-font-bold tw-text-gray-700 dark:tw-text-white hover:tw-text-gray-600" to={`/problem/${_id}`}>{name}</Link>
      <p className="tw-mt-2 tw-text-gray-600 dark:tw-text-gray-400">{intro}</p>
    </div>
    <div className="tw-mt-4 tw-flex tw-items-center tw-justify-between">
    {isPresent ? (<span className='tw-text-green-500 tw-font-semibold  tw-text-xl' variant="success"><Check2Circle fontSize={33} fontWeight={"bold"} className='tw-inline tw-mr-2' />Solved</span>) : (<Link to={`/problem/${_id}`}>
           <Button className='tw-text-lg' variant="secondary">Try out !</Button>
         </Link>)}
      <div className='tw-self-end tw-justify-self-end'>
        <div className="tw-flex tw-items-center">
          <img className="tw-mx-2  tw-h-10 tw-w-10 tw-rounded-full tw-object-cover sm:tw-block" src={authorId.image.url} alt="avatar" />
          <h1 className="tw-font-bold tw-text-gray-700 dark:tw-text-gray-400">{author}</h1>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}

export default Problem_card;