import React, { useState } from 'react';
import pfpLogo from '../images/pfp.jpeg';

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
                    : <img src={pfpLogo} alt="Image" style={{ width: 150, height: 150 }} />
            }
        </div>
    );
};

export default ProfilePicComponent;
