import React from 'react';
import {Typography,Button,Form,message,Input,Icon} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Dropzone from 'react-dropzone';

const {TextArea} = Input;
const {Title,Text} = Typography;

const VideoUploadPage = () => {
    return (
        <div style={{maxWidth:'700px',margin:'2rem auto',border:'1px red solid'}}>
            <div style={{textAlign:'center',marginBottom:'2rem',border:'1px green solid'}}>
                <Title level={2}><Text keyboard>Upload Video</Text></Title>
            </div>
        
        <Form onSubmit>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                {/* Drop zone 부분*/}

                <Dropzone
                onDrop
                multiple
                maxSize>
                {({ getRootProps,getInputProps}) => (
                    <div style={{width:'300px',height:'240px',border:'1px solid lightgray',
                    alignItems:'center',justifyContent:'center',textAlign:'center',lineHeight:'260px'}} {...getRootProps()}>
                     <input {...getInputProps()} />
                     <PlusOutlined style={{fontSize:'5rem'}}/>
                    </div>
                )}
                </Dropzone>
                {/* 썸네일부분 */}
                <div>
                    <img src alt />
                </div>
            </div>
            <label>Title</label>
            <Input
                onChange
                value
            />
            <br />
            <br />
            <label>Description</label>
            <TextArea
                onChange
                value
            />
            <br />
            <br />
            <select onChange>
                <option key value></option>
            </select>
            <br />
            <br />
            <select onChange>
                <option key value></option>
            </select>
            <br />
            <br />
            <Button type="primary" size="large" onClick>
                Submit
            </Button>
        </Form>
        </div>
    );
};

export default VideoUploadPage;