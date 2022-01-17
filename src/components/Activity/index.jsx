import ActivityItem from './ActivityItem'
import Filter from './Filter'

const Activity = ({ sortOption, filter, setSortOption, onChangeFilter }) => {
  return <section className='activity-section padding-top padding-bottom'>
    <div className='container-xl container-lg container-md container-sm'>
      <div className='section-wrapper'>
        <div className='row'>
          <div className='col-xl-8'>
            <div className='section-header'>
              <h3>Browse the newest VNFTs here</h3>
              {/* <Select label='Sort By' value={sortOption} onChange={e => setSortOption(e.target.value)} options={[{
                value: 'newest',
                label: 'Newest'
              }, {
                value: 'oldest',
                label: 'Oldest'
              }, {
                value: 'ending soon',
                label: 'Ending Soon'
              }, {
                value: 'recently sold',
                label: 'Recently Sold'
              }, {
                value: 'recently created',
                label: 'Recently Created'
              }, {
                value: 'recently viewed',
                label: 'Recently Viewed'
              }]} /> */}
            </div>
            <div className='activity-wrapper'>
              <div className='row gy-3'>
                <div className='col-12'>
                  <ActivityItem title='Gold digger x' description='GOLD DIGGER (x Antoni Tudisco) #44/44 was put up for sale for' price='0.0991 ETH' by='@rasselmrh' at='10/07/2021, 10:03 am' image='/assets/images/activity/01.gif' />
                </div>
                <div className='col-12'>
                  <ActivityItem title='ghost lix xrf' description='two rare collection purchased for' price='0.001 ETH<' by='@reo2lxsr' at='10/07/2021, 08:23 am' image='/assets/images/activity/02.gif' />
                </div>
                <div className='col-12'>
                  <ActivityItem title='Trust In meh' description='The Shopping Cart #54/65 was put up for sale for' price='0.021 ETH' by='@reo2lxsr' at='10/07/2021, 12:03 am' image='/assets/images/activity/04.gif' />
                </div>
                <div className='col-12'>
                  <ActivityItem title='Sysytan #0le' description='A offer of $200.00 was placed for ÜNDERSTANDING (Sean Williams) #1/20' price='0.021 ETH' by='@reo2lxsr' at='10/07/2021, 10:03 am' image='/assets/images/activity/05.gif' />
                </div>
                <div className='col-12'>
                  <ActivityItem title='ghost lix xrf' description='two rare collection purchased for' price='0.001 ETH' by='@reo2lxsr' at='10/07/2021, 02:03 pm' image='/assets/images/activity/03.gif' />
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4'>
            <Filter items={filter} onChange={onChangeFilter} />
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default Activity