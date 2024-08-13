import RTE from "../../components/RTE";
import Solutions from "../../pages/Create_Problem/components/Solutions";
import CheckBoxes from "../../pages/Create_Problem/components/CheckBoxes";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import axios from 'axios';

import { useNavigate, useParams } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Loader from "../../components/Loader";

export default function EditProblem() {
    const navigate = useNavigate();
    const [failure, setFailure] = useState(false)
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const { id } = useParams()

    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors, defaultValues } } = useForm();

    // console.log(defaultValues);

    useEffect(() => {
        axios.get(`/api/problem/${id}`)
            .then(({ data }) => {
                // console.log(data);
                // setProblem(() => data)
                Object.keys(data).forEach(key => {
                    setValue(key, data[key]);
                });

                setPageLoading(() => false)
            })
            .catch(err => {
                console.log(err);
                setFailure(() => err)
                setPageLoading(() => false)
            })
    }, [])

    async function onSubmit(problem) {
        try {
            setLoading(() => true)
            // console.log("This is the problem : ", problem);
            const { data } = await axios.put(`/api/problem/${id}`, {problem}  , {withCredentials : true})
            // console.log(data);
            navigate(`/problem/${data._id}`)
        } catch (error) {
            console.log(error);
            setFailure(error)
        }
        setLoading(false)
    }

    if (failure) {
        return (
            <Alert variant="danger">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    {failure.message}
                </p>
                <p>
                    {failure.response?.data.message}
                </p>
                <Link to="/admin/dashboard"><button className="btn btn-success btn-lg">Go back</button></Link>
            </Alert>
        );
    }

    if (pageLoading) {
        return <Loader color="violet" />
    }

    return (
        <div className="container mt-5 mb-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="inputField" className="form-label"><h3>Problem Name</h3></label>
                            <input {...register("name", { required: true })} type="text" className="form-control" id="inputField" placeholder="Enter text" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="textarea" className="form-label"><h3>Introduction</h3></label>
                            <textarea {...register("intro", { required: true })} className="form-control" id="textarea" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <h3>Difficulty</h3>
                    <CheckBoxes register={register} />
                </div>
                <div className="row">
                    <h3>Description</h3>
                    <RTE control={control} name="description" defaultValue={getValues("description")} errors={errors} />
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3 mt-5">
                            <label htmlFor="textarea1" className="form-label"><h4>Run Case input</h4></label>
                            <textarea {...register("runCases", { required: true })} className="form-control" id="textarea1" rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="textarea2" className="form-label"><h4>Test case input</h4> </label>
                            <textarea {...register("input", { required: true })} className="form-control" id="textarea2" rows="3"></textarea>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3 mt-5">
                            <label htmlFor="textarea3" className="form-label"><h4>Run case output</h4></label>
                            <textarea {...register("runOutput", { required: true })} className="form-control" id="textarea3" rows="3"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="textarea4" className="form-label"><h4>Test case output  </h4></label>
                            <textarea {...register("output", { required: true })} className="form-control" id="textarea4" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h3>Solutions</h3>
                    <Solutions control={control} errors={errors} />
                </div>
                <div className="row m-5">
                    <button type="submit" className="btn btn-primary">Update{'  '}{loading && (<Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />)}</button>
                </div>

            </form>
        </div>

    )
}