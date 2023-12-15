import { FC, useState } from 'react';
import './styles.css';
import { ImgUploadProps } from 'types/index';

const ImgUpload: FC<ImgUploadProps> = ({ onChange, src, size }) => {
  const [isFileMoreThenlimit, setIsFileMoreThenlimit] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxFileSize = 1048576 * 40; // 40 MB
      if (file.size > maxFileSize) {
        setIsFileMoreThenlimit(true);
        return;
      }
      onChange(e);
    }
  };

  return (
    <>
      <label htmlFor="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" style={{ width: size, height: size }}>
          {src ? (
            <img style={{ width: size, height: size }} className="avatar-img" src={src} alt="" />
          ) : (
            <span style={{ width: size, height: size }} className="add-photo-text">Foto </span>
          )}
        </div>
        <input id="photo-upload" type="file" onChange={handleFileChange} />
      </label>
      {isFileMoreThenlimit && <p className="error">Die Datei darf nicht größer als 1 MB sein</p>}
    </>
  );
};

export default ImgUpload;
