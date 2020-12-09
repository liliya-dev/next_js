import classes from './Overview.module.scss';

interface Props {
  overview: {
    overviewSections: {
      content: string[],
      title: string,
      type: string
    }[]
  }
}

export const Overview: React.FC<Props> = ({ overview }) => {
  function createMarkup(value) {
    return {__html: value};
  }

  return (
    <div className={classes.container}>
      <h4 className={classes.mainTitle}>
        Hotel overview:
      </h4>
      {
        overview && overview.overviewSections && (
          <ul className={classes.section}>
            {
              overview.overviewSections.map((overviewItem, index) => (
                <li key={overviewItem.title ? overviewItem.title : index} className={classes.item}>
                  <p className={`${classes.title} fs-16-italic-bold`}>{overviewItem.title && overviewItem.title}</p>
                  <ul className={classes.smallList}>
                    {
                      overviewItem.content.map((item, index) => (
                        <li key={item + index} className={`${classes.smallItem} fs-14-italic`}>
                          <span className={classes.check}>&#10004;</span> 
                          <p dangerouslySetInnerHTML={createMarkup(item)}></p>
                        </li>
                      ))
                    }
                  </ul>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
}