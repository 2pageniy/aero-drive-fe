import React, {useEffect, useState} from 'react';
import {getAllUsers} from "../http/user";
import Loader from "../components/Loader/Loader";
import User from "../components/User/User";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getAllUsers(setUsers).then(() => {
            setLoader(false);
        })
    }, [])

    if(loader) {
        return <Loader />
    }

    return (
        <div>
            {users.map(user =>
                <User setUsers={setUsers} key={user.id} user={user} />
            )}
        </div>
    );
};

export default Users;