import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {getFileOnLink} from "../http/file";
import File from "../components/Disk/FileList/File/File";
import Loader from "../components/Loader/Loader";
import {NOT_FOUND_ROUTE} from "../constants/routes";

const Link = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const search = location.search;
    const [file, setFile] = useState({});
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getFileOnLink(search)
            .then(response => response.data)
            .then(data => {
                setFile(data)
                if (!data) {
                    navigate(NOT_FOUND_ROUTE)
                }
                setLoader(false);
            });
    }, [])

    if (loader) {
        return <Loader />
    }

    return (
        <div style={{marginTop: '20px'}}>
            <File file={file} />
        </div>
    );
};

export default Link;