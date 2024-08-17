import{objectSpread2 as l,asyncToGenerator as n}from"../../_virtual/_rollupPluginBabelHelpers.js";import i,{useState as r,useEffect as o,useCallback as a}from"react";import"buffer";import{GetProgramList as e}from"../../api/program.js";import"@solana/web3.js";import"bs58";import{AssembleInstructionCallTransaction as t}from"../../api/instruction.js";import{Box as d,Table as c,Thead as s,Tr as u,Th as p,Tbody as h,Td as m,IconButton as v,Collapse as f,Button as T,Flex as b,Text as g,Modal as k,ModalOverlay as y,ModalContent as P,ModalHeader as C,ModalCloseButton as N,ModalBody as j,VStack as w,Select as x,Input as S,Checkbox as A,ModalFooter as _}from"@chakra-ui/react";import{jsx as B,jsxs as I,Fragment as R}from"react/jsx-runtime";import{useConfig as U}from"../../ConfigContext.js";import{SignAndSendTransaction as D}from"../../api/transaction.js";import{CreateTask as z,GetTaskList as E}from"../../api/task.js";import{ChevronUpIcon as F,ChevronDownIcon as O}from"@chakra-ui/icons";import"../airdrop/Dashboard.js";import"../airdrop/Instruction.js";import"../airdrop/Task.js";import"@solana/wallet-adapter-phantom";import"@solana/wallet-adapter-solflare";import"@solana/wallet-adapter-react-ui";import"../wallet/WalletModal.js";import"@solana/wallet-adapter-react";var G=a=>{var{authToken:e,wallet:b,taskStatus:g,showInstructionCalls:k,boxProps:y,tableProps:P,collapseProps:C}=a,[N,j]=r([]),[w,x]=r(0),S=U();o((()=>{(function(){var i=n((function*(){var n=(yield E(S.backendUrl,S.airdropAppRoot,e,g)).map((n=>l(l({},n),{},{transactions:[n.transactions].filter(Boolean)})));j(n||[])}));return function(){return i.apply(this,arguments)}})()()}),[S.backendUrl,S.airdropAppRoot,e,g]);var A=l=>l.transaction?l.transaction.status:"NA",_=l=>{switch(A(l)){case"NA":return"Assemble and Send";case"assembled":return"Sign and Send";case"pending":return B(R,{children:"Pending To Confirm"});case"confirmed":return B(R,{children:"Pending To Finalize"});case"finalized":return"Explore";case"failed":return"Resign and Send";default:return"Unknown Status"}},z=function(){var l=n((function*(l){if(console.log(l),l.transaction&&"failed"!==l.transaction.status){if(l.transaction&&"assembled"===l.transaction.status)yield D(S.backendUrl,S.airdropAppRoot,e,b,l.transaction.id);else if("pending"===l.transaction.status||"confirmed"===l.transaction.status);else if(l.transaction&&"finalized"===l.transaction.status){var n="https://explorer.solana.com/tx/".concat(l.transaction.transaction_hash,"?cluster=devnet");window.open(n,"_blank")}}else yield t(S.backendUrl,S.airdropAppRoot,e,b,l.id)}));return function(n){return l.apply(this,arguments)}}();return B(d,l(l({},y),{},{children:I(c,l(l({},null==P?void 0:P.Table),{},{children:[B(s,l(l({},null==P?void 0:P.Table),{},{children:I(u,l(l({},null==P?void 0:P.Table),{},{children:[B(p,l(l({},null==P?void 0:P.Th),{},{children:"ID"})),B(p,l(l({},null==P?void 0:P.Th),{},{children:"Name"})),B(p,l(l({},null==P?void 0:P.Th),{},{children:"Program Name"})),B(p,l(l({},null==P?void 0:P.Th),{},{children:"Public Key"})),B(p,l(l({},null==P?void 0:P.Th),{},{children:"Status"})),k&&B(p,{children:"Instructions"})]}))})),B(h,l(l({},null==P?void 0:P.Tbody),{},{children:N.map((r=>I(i.Fragment,{children:[I(u,l(l({},null==P?void 0:P.Tr),{},{children:[B(m,l(l({},null==P?void 0:P.Td),{},{children:r.id})),B(m,l(l({},null==P?void 0:P.Td),{},{children:r.name})),B(m,l(l({},null==P?void 0:P.Td),{},{children:r.program_name})),B(m,l(l({},null==P?void 0:P.Td),{},{children:r.public_key})),B(m,l(l({},null==P?void 0:P.Td),{},{children:r.task_status})),k&&B(m,l(l({},null==P?void 0:P.Td),{},{children:B(v,{"aria-label":"Toggle Instructions",icon:w===r.id?B(F,{}):B(O,{}),onClick:()=>{return l=r.id,x(w===l?0:l),void console.log("------------------------Toggling task. Previous state:",w);var l}})}))]})),k&&B(u,l(l({},null==P?void 0:P.Tr),{},{children:B(m,l(l({},null==P?void 0:P.Td),{},{colSpan:7,children:B(f,l(l({in:r.id===w,animateOpacity:!0},null==C?void 0:C.Collapse),{},{children:B(d,l(l({},null==C?void 0:C.Box),{},{children:r.instruction_calls&&r.instruction_calls.length>0?I(c,l(l({},null==C?void 0:C.Table),{},{children:[B(s,l(l({},null==C?void 0:C.Thead),{},{children:I(u,l(l({},null==C?void 0:C.Tr),{},{children:[B(p,l(l({},null==C?void 0:C.Th),{},{children:"Instruction ID"})),B(p,l(l({},null==C?void 0:C.Th),{},{children:"Transaction Status"})),B(p,l(l({},null==C?void 0:C.Th),{},{children:"Timestamp"})),B(p,l(l({},null==C?void 0:C.Th),{},{children:"Action"}))]}))})),B(h,l(l({},null==C?void 0:C.Tbody),{},{children:r.instruction_calls.map((i=>I(u,l(l({},null==C?void 0:C.Tr),{},{children:[B(m,l(l({},null==C?void 0:C.Td),{},{children:i.id})),B(m,l(l({},null==C?void 0:C.Td),{},{children:A(i)})),B(m,l(l({},null==C?void 0:C.Td),{},{children:i.timestamp})),B(m,l(l({},null==C?void 0:C.Td),{},{children:B(T,l(l({},null==C?void 0:C.actionButton),{},{onClick:n((function*(){return z(i)})),children:_(i)}))}))]}),i.id)))}))]})):B(d,l(l({},null==C?void 0:C.Box),{},{children:"No instructions available for this task."}))}))}))}))}))]},r.id)))}))]}))}))},H=i=>{var t,d,c,s,u,p,h,m,{authToken:v,wallet:f,label:R,flexProps:D,buttonProps:E,modalData:F=null}=i,O=U(),[G,H]=r(!1),[K,M]=r({}),[W,q]=r(""),[J,L]=r(""),[Q,V]=r([]);o((()=>{(function(){var l=n((function*(){try{var l=yield e(O.backendUrl,O.airdropAppRoot,v);V(l)}catch(l){console.error("Error fetching program list:",l)}}));return function(){return l.apply(this,arguments)}})()()}),[v]);var X=a(n((function*(){try{yield z(O.backendUrl,O.airdropAppRoot,v,f,W,J,K)}catch(l){console.error("Error during submission:",l)}})),[W,J,K,F,O,v,f]),Y=a((()=>{H(!0)}),[]),Z=a((n=>{M((i=>l(l({},i),{},{[n.payloadName]:!i[n.payloadName]})))}),[M]),$=a(((n,i)=>{"program"===n?q(i):"name"===n?L(i):M((r=>l(l({},r),{},{[n.payloadName]:i})))}),[M]);return I(b,l(l({},D),{},{children:[B(T,l(l({},E),{},{onClick:Y,children:B(g,l(l({},R.labelProps),{},{children:R.text}))})),B(b,l(l({},null==F||null===(t=F.modalProps)||void 0===t?void 0:t.flex),{},{children:I(k,l(l({},null==F||null===(d=F.modalProps)||void 0===d?void 0:d.modal),{},{isOpen:G,onClose:()=>H(!1),children:[B(y,{}),I(P,{children:[B(C,l(l({},null==F?void 0:F.label.header),{},{children:B(g,l(l({},null==F?void 0:F.label.labelProps),{},{children:null==F?void 0:F.label.text}))})),B(N,{}),B(j,l(l({},null==F||null===(c=F.modalProps)||void 0===c?void 0:c.body),{},{children:I(w,l(l({},null==F||null===(s=F.modalProps)||void 0===s?void 0:s.vStack),{},{spacing:4,children:[B(x,{placeholder:"Select program",value:W,onChange:l=>$("program",l.target.value),children:Q.map((l=>B("option",{value:l.id,children:l.name},l.id)))},"program"),B(S,{placeholder:"Task name",value:J,onChange:l=>$("name",l.target.value)},"name"),null==F||null===(u=F.inputFields)||void 0===u?void 0:u.map((l=>"boolean"==l.fieldType?B(A,{isChecked:K[l.payloadName]||!1,onChange:()=>Z(l),children:l.fieldName},l.payloadName):B(S,{placeholder:l.fieldName,value:K[l.payloadName]||"",onChange:n=>$(l,n.target.value),type:l.fieldType},l.payloadName)))]}))})),I(_,l(l({},null==F||null===(p=F.modalProps)||void 0===p?void 0:p.footer),{},{children:[B(T,l(l({},null==F||null===(h=F.modalProps)||void 0===h?void 0:h.submitButton),{},{onClick:X,children:"Submit"})),B(T,l(l({},null==F||null===(m=F.modalProps)||void 0===m?void 0:m.cancelButton),{},{onClick:()=>H(!1),children:"Cancel"}))]}))]})]}))}))]}))};export{H as TaskCreateButton,G as TaskList};