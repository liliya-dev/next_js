import classes from "./ReloadButton.module.scss"
import { useRouter } from "next/router";

export const ReloadButton = () => {
  const router = useRouter();
  const reload = () => {
    router.reload();
  }

  return (
    <div className={classes.container}>
      <p>Some error occured, please try to reload</p>
      <button
        type="button"
        className={`${classes.button} fs-16-bold`}
        onClick={reload}
      >
        Reload
      </button>
    </div>
  )
}