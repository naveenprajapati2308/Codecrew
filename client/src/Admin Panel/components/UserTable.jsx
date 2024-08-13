import UserTableRow from "./UserTableRow"

export default function UserTable({users=null}) {

    return (
        <div className="container tw-my-20 tw-overflow-scroll tw-h-screen">
        <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
                <tr>
                    <th>User</th>
                    <th>Problem Solved</th>
                    <th>isAdmin</th>
                    {/* <th>Message</th> */}
                    {/* <th>Language</th> */}
                    {/* <th>Submitted at</th> */}
                    <th>User Id</th>
                    <th>Profile</th>
                </tr>
            </thead>
            <tbody >
                {users && users.length>0 && users.map((user)=><UserTableRow key={user._id} {...user}/>)}
            </tbody>
        </table>
    </div>
    )
}