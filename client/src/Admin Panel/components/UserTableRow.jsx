import {PersonCircle} from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

export default function UserTableRow({username , _id , email , isAdmin , solved , user='',
    problemName='', problemId='', userId='', language='', code='', status='', message='', createdAt='' , image}) {
    return (
            <>
                <tr>
                    <td>
                        <div className="d-flex align-items-center">
                            <img
                                src={image.url}
                                alt=""
                                style={{ width: '45px', height: '45px' }}
                                className="rounded-circle"
                            />
                            <div className="ms-3">
                                <p className="fw-bold mb-1">{username}</p>
                                <p className="text-muted mb-0">{email}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p className="fw-normal mb-1">{solved.length}</p>
                    </td>
                    <td>
                        {!isAdmin? (<span className="btn btn-success tw-w-20">User</span>) : <span className="btn btn-warning tw-w-20">Admin</span>}
                    </td>
                    {/* <td>{message}</td> */}
                    {/* <td>
                        <h6>{language}</h6>
                    </td> */}
                    {/* <td>
                        <h6>{formatDistanceToNow(createdAt, { addSuffix: true })}</h6>
                    </td> */}
                    <td>
                        <h6 className="tw-font-semibold">{_id}</h6>
                    </td>
                    {/* <td>
                        <button onClick={() => setModalShow(true)} type="button" className="btn btn-primary btn-sm btn-rounded" >
                            {"</>"}
                        </button>
                    </td> */}
                    <td>
                    <Link className='remove-underline' to={`/user/${username}`}>
                    <button className="btn btn-primary btn-sm btn-rounded" >
                            <PersonCircle size={25}/>
                        </button>
                            </Link>
                    </td>
                </tr>
                {/* <Solution
                    code={code}
                    language={language}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                /> */}
            </>
    )
}