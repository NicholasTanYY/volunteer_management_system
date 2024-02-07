import React, { useState } from 'react';

const ProfilePicComponent: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedImage(file || null);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {
                selectedImage
                    ? <img src={URL.createObjectURL(selectedImage)} alt="Profile Picture" />
                    : <img src={'https://via.placeholder.com/150'} alt="Profile Picture" />
            }

        </div>
    );
};

export default ProfilePicComponent;
