import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { getPosts } from '../../Reducers/postsSlice'
import { addNewPost } from '../../Reducers/addNewPostSlice'
import { Toast } from '../../utilities/notifications'
import { Toaster } from "react-hot-toast"
import useDecodedSession from '../../hooks/useDecodedSession'

const AddPostForm = ({ close }) => {
    const successToast = new Toast('Post salvato correttamente')
    const errorToast = new Toast('File mancante')

    const [file, setFile] = useState(null)
    const [formData, setFormData] = useState({})

    const dispatch = useDispatch()

    const actualUser = useDecodedSession();
    console.log(actualUser)

    // const isAdmin = 'admin'
    // const users = 'user'

    const onChangeHandleFile = (e) => {
        //sempre uguale per upload singolo
        setFile(e.target.files[0])
    }

    //handler
    const upLoadFile = async (file) => {
        const fileData = new FormData()
        fileData.append('img', file)

        try {
            const response = await fetch(process.env.REACT_APP_CLOUD_SERVER_BASE_URL, {
                //per il locale si usava http://localhost:5050/posts/uploadImg'
                method: 'POST',
                body: fileData
            })
            return await response.json()
        } catch (error) {
            console.error('File upload error', error)
        }
    }

    const submitPost = async (e) => {
        e.preventDefault()

        if (file) {
            try {
                const uploadedFile = await upLoadFile(file)
                const postsFormData = {
                    ...formData,
                    img: uploadedFile.img
                    //è la stringa restituita dalla promise
                }
                dispatch(addNewPost(postsFormData))
                    .then(() => {
                        successToast.success()
                        dispatch(getPosts({ page: 1, pageSize: 8 }))
                    })
            } catch (error) {
                errorToast.warning()
                console.error('Salvataggio fallito', error)
            }
        } else {
            console.error('selezionare un file')
            errorToast.warning()
        }
    }

    return (
        <div className='p-4'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <form onSubmit={submitPost} encType='multipart/form-data'>
                {/* per far si che il form accetti input normali e file */}
                <div className='d-flex justify-center items-center flex-wrap'>
                    <input
                        type="text"
                        name="title"
                        placeholder="Titolo"
                        className="text black rounded mb-2 p-2 border w-100"
                        onChange={(e) => setFormData({
                            ...formData,
                            title: e.target.value
                        })}
                    />

                    {/* SCELTA DELL'UTENTE */}
                    <div>
                        {actualUser && actualUser.role === 'admin' && <select
                            name='author'
                            placeholder='author'
                            className="text-black rounded p-2 mb-2 border w-100"
                            rows={8}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    author: e.target.value
                                })
                            }
                        >
                            <option>Scegli autore</option>
                            <option value={actualUser.id}>{actualUser.userName}</option>
                        </select>}
                    </div>

                    <div>
                        {actualUser && actualUser.role === 'user' && <select
                            name='author'
                            className="text-black rounded mb-2 p-2 border w-100"
                            rows={8}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    author: e.target.value
                                })}
                        >
                            <option></option>
                            <option value={actualUser.id}>{actualUser.userName}</option>
                        </select>}
                    </div>
                    {/* FINE SCELTA UTENTE */}

                    {/* {actualUser && isAdmin && (
                        <select
                            className="text-black rounded mb-2 p-2 border w-100"
                            name='author'
                            onChange={(e) => setFormData({
                                ...formData,
                                author: e.target.value,
                            })
                            }
                        >
                            <option>Seleziona l'uente</option>
                            {users.users && users.users.map((item) => {
                                return (
                                    <option key={item._id} value={item._id}>{item.userName}</option>
                                )
                            })}
                        </select>
                    )} avrei preferito questa soluzione ma non funziona*/}

                    <select
                        type="number"
                        name="rate"
                        placeholder="voto"
                        className="text-secondary form-select rounded mb-2 p-2 border w-100"
                        onChange={(e) => setFormData({
                            ...formData,
                            rate: e.target.value
                        })}
                    >
                        <option>Dai un voto</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>

                <textarea
                    placeholder="Testo del post..."
                    className="text-black rounded p-2 mb-2 border w-100"
                    rows={8}
                    onChange={(e) => setFormData({
                        ...formData,
                        content: e.target.value
                    })}
                />

                <div>
                    <input
                        name="img"
                        type="file"
                        className="buttonInput text-black rounded p-2 mb-2"
                        onChange={onChangeHandleFile}
                    />
                </div>
                <div className="d-grid gap-2">
                    <Button
                        type="submit"
                        variant="outline-warning"
                    >
                        salva
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddPostForm
