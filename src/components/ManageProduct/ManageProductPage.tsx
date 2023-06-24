import HeaderManageProduct from '../HeaderManageProduct/HeaderManageProduct'
import styles from './ManageProductPage.module.css'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { useEffect, useState } from 'react'
import { getProducts, removeToManageProduct } from '../../redux/features/manageProductSlice'
import { Button, Modal } from 'antd'
import { ProductValues } from '../../type/ProductValues'
import { ErrorMessage, Field, Formik, Form, FormikProps } from 'formik'
import { useLocation } from 'react-router-dom'
import { initialValues } from '../../type/initialValues'
import { validationSchemaProduct } from '../../type/validationSchemaProduct'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { createNewProduct } from '../../services/productService'
const animatedComponents = makeAnimated()

const multipleSize = [
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },
    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' }
]
const ManageProductPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { state } = useLocation()
    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const productItems = useAppSelector((state) => state.manageProduct.products)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (productItems.length <= 0) {
            dispatch(getProducts())
        }
    }, [])

    const [size, setSize] = useState<string[]>([])
    const [selectedImages, setSelectedImages] = useState<File[]>([])

    // const handleImageChange = (e: ChangeEvent<HTMLInputElement>, formik: FormikProps<ProductValues>) => {
    //     const files = Array.from(e.target.files || [])
    //     setSelectedImages((prevSelectedImages) => [...prevSelectedImages, ...files])
    //     const fileNames = files.map((file) => file.name)
    //     formik.setFieldValue('imgUrl', fileNames)
    // }

    const uploadImage = (formik: FormikProps<ProductValues>) => {
        const fileNames = selectedImages.map((file) => file.name)
        console.log(fileNames)
        formik.setFieldValue('imgUrl', fileNames)
    }

    const handleChooseSize = (selectedOptions: any) => {
        const sizes = selectedOptions.map((option: any) => option.value)
        setSize((prevSize) => [...prevSize, ...sizes])
        console.log('Cac size da chon === ', sizes)
    }

    console.log(size)

    const handleSubmit = async (values: ProductValues) => {
        const newProduct = await createNewProduct(values)
        console.log('newProduct === ', newProduct)
    }

    return (
        <div className={`productPageContainer px-[20px] py-[10px]`}>
            <HeaderManageProduct />
            <div className={`h-[50px] flex items-center justify-center`}>
                <h2 className={`text-[25px]`}>Product Page</h2>
            </div>
            <div className={`h-[50px] flex items-center justify-center`}>
                <input
                    className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px] w-[360px] px-[10px] py-[5px]`}
                    type='text'
                    placeholder='Search Product'
                />
            </div>
            <div className={`mt-[30px] flex flex-col justify-center items-center`}>
                <div className='flex justify-start w-full gap-3 mb-6'>
                    <Button className='bg-blue-500' type='primary' onClick={showModal}>
                        Create a new Product
                    </Button>
                    <Modal title='Create A New Product' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Formik<ProductValues>
                            onSubmit={handleSubmit}
                            validationSchema={validationSchemaProduct}
                            initialValues={state == null ? initialValues : state}
                        >
                            {(formik) => (
                                <div>
                                    <Form onSubmit={formik.handleSubmit}>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='title' className='mb-[0.2rem] font-[700]'>
                                                Title
                                            </label>
                                            <Field
                                                as='input'
                                                name='title'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md`}
                                            />
                                            <ErrorMessage className={`${styles.error}`} name='title' component='div' />
                                        </div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='description' className='mb-[0.2rem] font-[700]'>
                                                Description
                                            </label>
                                            <Field
                                                as='input'
                                                name='description'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md`}
                                            />
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='description'
                                                component='div'
                                            />
                                        </div>

                                        <ErrorMessage name='inputValue' component='div' />
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='datePublish' className='mb-[0.2rem] font-[700]'>
                                                Date Publish
                                            </label>
                                            <Field
                                                as='input'
                                                name='datePublish'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md   `}
                                            />
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='datePublish'
                                                component='div'
                                            />
                                        </div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='category' className='mb-[0.2rem] font-[700]'>
                                                Category
                                            </label>
                                            <Field
                                                as='input'
                                                name='category'
                                                className={`border-neutral-400 border-solid border-x-[1px] border-y-[1px]  px-[10px] py-[5px] rounded-md   `}
                                            />
                                            <ErrorMessage
                                                className={`${styles.error}`}
                                                name='category'
                                                component='div'
                                            />
                                        </div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='size' className='mb-[0.2rem] font-[700]'>
                                                Size
                                            </label>
                                            <Field
                                                name='size'
                                                as={Select}
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                isMulti
                                                value={size}
                                                onChange={handleChooseSize}
                                                options={multipleSize}
                                            />
                                            <ErrorMessage className={`${styles.error}`} name='size' component='div' />
                                        </div>
                                        <div className={`my-[0.8rem] grid`}>
                                            <label htmlFor='imgUrl' className='mb-[0.2rem] font-[700]'>
                                                Image Url
                                            </label>
                                            <input
                                                className='mb-[0.6rem]'
                                                type='file'
                                                id='imageInput'
                                                name='imgUrl'
                                                onChange={(event) => {
                                                    formik.setFieldValue('imgUrl', event.currentTarget.files)
                                                }}
                                                multiple
                                            />
                                            <button
                                                className='w-[4.6rem] h-[1.8rem] bg-blue-600 text-white rounded-md'
                                                onClick={() => uploadImage(formik)}
                                            >
                                                Upload
                                            </button>
                                            <ErrorMessage className={`${styles.error}`} name='imgUrl' component='div' />
                                        </div>
                                        <div>
                                            <button
                                                className='bg-blue-600 w-[4.6rem] h-[1.8rem] text-white rounded-md'
                                                type='submit'
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </Modal>
                </div>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>title</th>
                            <th>Description</th>
                            <th>DatePublish</th>
                            <th>Category</th>
                            <th>Size</th>
                            <th>imgUrl</th>
                            {/* <th>Price</th> */}
                            <th>Feature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productItems.map((product, index) => (
                            <tr key={index}>
                                <td className='w-11'>{index + 1}</td>
                                <td className='w-36'>{product.title}</td>
                                <td className='w-40'>{product.description}</td>
                                <td className='w-28'>{product.datePublish}</td>
                                <td className='w-32'>{product.category}</td>
                                <td className='w-32'>{product.size}</td>
                                <td className='w-40'>asdfsafdsdf</td>
                                {/* <td className='w-16'>{product.price}</td> */}
                                <td className='w-36'>
                                    <div>
                                        <button className={`${styles.editBtn}`}>Edit</button>
                                        <button
                                            className={`${styles.deleteBtn}`}
                                            onClick={() => dispatch(removeToManageProduct(product._id))}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageProductPage
