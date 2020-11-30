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
  console.log(overview.overviewSections)
  return (
    <div className={classes.overviewContainer}>
      <h4>
        Hotel overview:
      </h4>
      {
        overview && overview.overviewSections && (
          <ul className={classes.overviewSection}>
            {
              overview.overviewSections.map(overviewItem => (
                <li>
                  {overviewItem.title && overviewItem.title}
                  <ul>
                    {
                      overviewItem.content.map(item => (
                        <li><span>&#10004;</span> {item}</li>
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