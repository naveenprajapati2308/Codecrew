import { Link } from "react-router-dom"

export default function ProblemTable({ problems }) {
    return (
        <>
            <div className="container tw-h-screen tw-mt-32">
                <div className="row">
                    <div className="col-md-offset-1 col-md-10">
                        <div className="panel">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-sm-12 col-xs-12">
                                        {/* <a href="#" className="btn btn-sm btn-primary pull-left"><i className="fa fa-plus-circle"></i> Add New</a> */}
                                        <form className="form-horizontal pull-right">
                                            <div className="form-group">
                                                <label>Show : </label>
                                                <select className="form-control">
                                                    <option>5</option>
                                                    <option>10</option>
                                                    <option>15</option>
                                                    <option>20</option>
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Action</th>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Difficulty</th>
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    {/* <tbody>
                                        <tr>
                                            <td>
                                                <ul className="action-list">
                                                    <li><a href="#" className="btn btn-primary"><i className="fa fa-pencil-alt"></i></a></li>
                                                    <li><a href="#" className="btn btn-danger"><i className="fa fa-times"></i></a></li>
                                                </ul>
                                            </td>
                                            <td>1</td>
                                            <td>Vincent Williamson</td>
                                            <td>31</td>
                                            <td><a href="#" className="btn btn-sm btn-success"><i className="fa fa-search"></i></a></td>
                                        </tr>
                                    </tbody> */}

                                    {problems && problems.length > 0 && problems.map(problem => (
                                        
                                            <tbody  key={problem._id}>
                                                <tr>
                                                    <td>
                                                        <ul className="action-list">
                                                            <li><Link to={`/admin/problem/edit/${problem._id}`}><a  className="btn btn-primary"><i className="fa fa-pencil-alt"></i></a></Link></li>
                                                            <li><Link to="/admin/problems"><a  className="btn btn-danger"><i className="fa fa-times"></i></a></Link></li>
                                                        </ul>
                                                    </td>
                                                    <td>1</td>
                                                    <td>{problem.name}</td>
                                                    <td>{problem.difficulty}</td>
                                                    <td><Link to={`/problem/${problem._id}`}><a className="btn btn-sm btn-success"><i className="fa fa-search"></i></a></Link></td>
                                                </tr>
                                            </tbody>
                                        
                                    ))}

                                </table>
                            </div>
                            {/* 
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col-sm-6 col-xs-6">showing <b>5</b> out of <b>25</b> entries</div>
                                    <div className="col-sm-6 col-xs-6">
                                        <ul className="pagination hidden-xs pull-right">
                                            <li><a href="#">«</a></li>
                                            <li className="active"><a href="#">1</a></li>
                                            <li><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#">4</a></li>
                                            <li><a href="#">5</a></li>
                                            <li><a href="#">»</a></li>
                                        </ul>
                                        <ul className="pagination visible-xs pull-right">
                                            <li><a href="#">«</a></li>
                                            <li><a href="#">»</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                             */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}