import { Fragment, useState } from 'react'

import Banner from '../components/common/Banner'
import CreateComponent from '../components/Create'

import agent from '../api/'

const Create = () => {
  const [file, setFile] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [data, setData] = useState(null)
  const [type, setType] = useState('')
  const onFileChanged = async e => {
    const file = e.target.files[0]
    console.log('filetype:', file.type)
    if (file.type.startsWith('image')) {
      setType('image')
    } else if (file.type.startsWith('video')) {
      setType('video')
    } else if (file.type.startsWith('audio')) {
      setType('audio')
    }
    setFile(file.name)
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = e => setData(reader.result)
  }
  const create = async () => {
    const result = await agent.customNFT.create('0x12345', name, description, data)
    console.log('result:', result.data)
  }
  return <Fragment>
    <Banner title='Create NFT Page' subtitle='Create NFT' />
    <CreateComponent file={file}
      name={name}
      description={description}
      data={data}
      type={type}
      setName={setName}
      setDescription={setDescription}
      onFileChanged={onFileChanged}
      create={create}
    />
  </Fragment>
}

export default Create