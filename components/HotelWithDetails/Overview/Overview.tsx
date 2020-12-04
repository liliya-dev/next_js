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
    <div className={classes.overviewContainer}>
      <h4 className={classes.title}>
        Hotel overview:
      </h4>
      {
        overview && overview.overviewSections && (
          <ul className={classes.overviewSection}>
            {
              overview.overviewSections.map(overviewItem => (
                <li key={overviewItem.title} className={classes.overviewItem}>
                  <p className={`${classes.overviewTitle} fs-16-italic-bold`}>{overviewItem.title && overviewItem.title}</p>
                  <ul className={classes.overviewSmallList}>
                    {
                      overviewItem.content.map(item => (
                        <li key={item}className={`${classes.overviewSmallItem} fs-14-italic`}>
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