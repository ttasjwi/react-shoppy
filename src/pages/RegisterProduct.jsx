import React, {useState} from 'react';
import Button from "../components/ui/Button";
import uploadImage from "../api/imageUploader";
import {registerNewProduct} from "../api/firebase";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const RegisterProduct = () => {
    const [product, setProduct] = useState({});
    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSuccess] = useState(undefined);

    const queryClient = useQueryClient();
    const registerProduct = useMutation({
        mutationFn: ({product, url}) => registerNewProduct(product, url),
        onSuccess: () => queryClient.invalidateQueries()
    });

    const handleChange = (e) => {
        const {name, value, files} = e.target;

        // 파일일 경우, 파일 상태 변경 반영하고 return
        if (name === 'imageFile') {
            setFile(files && files[0]);
            return;
        }

        // 그 외의 경우 product의 상태를 변경
        setProduct(prev => ({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 제품의 사진을 cloudinary에 업로드하고 url 획득
        setIsUploading(true);
        uploadImage(file)
            .then(url => {
                // Firebase에 새로운 제품을 추가
                registerProduct.mutate({product, url}, {
                    onSuccess: () => {
                        setSuccess('성공적으로 제품이 추가되었습니다.');
                        setTimeout(() => {
                            setSuccess(null);
                        }, 4000);
                    }
                } )
            })
            .finally(() => setIsUploading(false));
    };

    return (
        <section className='w-full text-center'>
            <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
            {success && <p className='my-2'>✅ {success}</p>}
            {file && <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(file)} alt='local file' />}
            <form onSubmit={handleSubmit} className='flex flex-col px-12'>
                <input type='file'
                       accept='image/*'
                       name='imageFile'
                       required
                       onChange={handleChange}
                />
                <input type='text'
                       name='name'
                       value={product.name ?? ''}
                       placeholder='제품명'
                       required
                       onChange={handleChange}
                />
                <input type='number'
                       name='price'
                       value={product.price ?? ''}
                       placeholder='가격'
                       required
                       onChange={handleChange}
                />
                <input type='text'
                       name='category'
                       value={product.category ?? ''}
                       placeholder='카테고리'
                       required
                       onChange={handleChange}
                />
                <input type='text'
                       name='description'
                       value={product.description ?? ''}
                       placeholder='제품 설명'
                       required
                       onChange={handleChange}
                />
                <input type='text'
                       name='options'
                       value={product.options ?? ''}
                       placeholder='옵션들((,)으로 구분)'
                       required
                       onChange={handleChange}
                />
                <Button
                    text={isUploading ? '업로드 중...' : '제품 등록하기'}
                    disabled={isUploading}
                />
            </form>
        </section>
    );
}

export default RegisterProduct;
