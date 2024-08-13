import { useState } from "react";
import Solution from "./Solution";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

export default function TableRow({
  _id,
  user,
  email,
  problemName,
  problemId,
  userId,
  language,
  code,
  status,
  message,
  createdAt,
  runtime
}) {
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate()

  return (
    <>
      <tr>
        <td>
          <div className="d-flex align-items-center">
            <Link className="remove-underline" to={`/user/${user}`}>
              <img
                src={userId?.image.url}
                alt=""
                style={{ width: "45px", height: "45px" }}
                className="rounded-circle"
              />
            </Link>
            <Link className="remove-underline" to={`/user/${user}`}>
              <div className="ms-3">
                <p className="fw-bold mb-1">{user}</p>
                <p className="text-muted mb-0">{email}</p>
              </div>
            </Link>
          </div>
        </td>
        <td>
          <p className="fw-normal mb-1">{problemName}</p>
        </td>
        <td>
          {status == "Rejected" ? (
            <span className="btn btn-danger">{status}</span>
          ) : (
            <span className="btn btn-success">{status}</span>
          )}
        </td>
        <td>{message}</td>
        <td>
          <h6 className="tw-font-semibold">{language}</h6>
        </td>
        <td>
          <h6 className="tw-font-semibold">
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </h6>
        </td>
        <td onClick={()=>{navigate(`/submission/${_id}`)}} className="dark:hover:tw-bg-gray-700 tw-cursor-pointer hover:tw-bg-gray-200">
          <h6 className="tw-font-semibold">{_id}</h6>
        </td>
        <td className="tw-text-center"><span className="tw-text-green-500 tw-font-medium">{runtime ? runtime : "-"}</span></td>
        <td>
          <button
            onClick={() => setModalShow(true)}
            type="button"
            className="btn btn-primary btn-sm btn-rounded"
          >
            {"</>"}
          </button>
        </td>
      </tr>
      <Solution
        code={code}
        language={language}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
