import Button from '../components/Button'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox  from '../components/InputBox'
import BottomWarning from '../components/BottomWarning'
const Signin =()=>{
    return (
        <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center '>
            <div className='rounded w-80 text-center bg-white p-2 h-max px-4'>
            <Heading label={"SignIn"}/>
            <SubHeading label={"Enter your information to create an account"}/>
            <InputBox label={"First name:"} placeholder="FirstName"/>
            <InputBox label={"Last name:"} placeholder="FirstName"/>
            <InputBox label={"Email:"} placeholder="FirstName"/>
            <InputBox label={"Password:"} placeholder="FirstName"/>
            <Button label={"SignIn"}/>
            <BottomWarning label={"Already have a account"} buttonText={"Sign Up"} to={'/signup'}/>
            </div>
        </div>
        </div>
    )
}

export default Signin