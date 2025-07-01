import Image from "next/image";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { signIn } from "next-auth/react";

const SignInDialog = () => {
  const handleLoginWithGoogleClick = async () => {
    await signIn('google')
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça Login na plataforma</DialogTitle>
        <DialogDescription>Conecte-se usando sua conta do google</DialogDescription>
      </DialogHeader>
      <Button
        variant={'outline'}
        className="gap-1 font-bold"
        onClick={handleLoginWithGoogleClick}
      >
        <Image
          src={"/google_logo.svg"}
          alt="logo do google"
          width={18} height={18} />
        Google
      </Button>

    </>
  )
}

export default SignInDialog;