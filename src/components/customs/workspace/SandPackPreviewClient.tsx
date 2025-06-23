// import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react'
// import React, { useEffect, useRef } from 'react'

// const SandPackPreviewClient = () => {
//     const previewRef = useRef<React.ElementRef<typeof SandpackPreview>>(null);
//     const {sandpack} = useSandpack()

//     useEffect(()=>{
//         getSandpackClient()
//     },[sandpack])

//     const getSandpackClient =  ()=>{
//         const client = previewRef.current?.getClient();
//         console.log("Sandpack Client:", client);
//         // if (client) {
//         //     // const response = await client.getCodeSandboxURL()
//         //     // console.log("CodeSandbox URL:", response);
//         // }  
//     }
//   return (
//     <>
//     <SandpackPreview ref={previewRef} style={{height:'80vh'}} showNavigator={true}/>
//     </>
//   )
// }

// export default SandPackPreviewClient
