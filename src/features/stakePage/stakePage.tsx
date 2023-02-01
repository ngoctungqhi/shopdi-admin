import { memo } from 'react'
import { useStakePage } from './useStakePage'
import { rankToText } from 'utils'
import { toNormalNumber } from 'utils/formatBalance'
import { Button, Modal, Tooltip } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { StakeSettingDialog } from './components/stakeSettingDialog/stakeSettingDialog'

export const StakePage = memo(() => {
  const {
    stakeToken,
    stakeInfo,
    handleOpenSettingStakeDialog,
    isOpenSettingStakeDialog,
  } = useStakePage()

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h4 className="text-3xl">Stake info</h4>
          <Tooltip title="Setting">
            <Button
              shape="circle"
              icon={<SettingOutlined />}
              onClick={handleOpenSettingStakeDialog}
            />
          </Tooltip>
        </div>
        <div className="flex flex-col gap-y-5">
          <div className="flex gap-x-5 items-end">
            <span className="font-bold text-xl">Stake token address</span>
            <span className="text-xl">{stakeToken}</span>
          </div>
          <div>
            <h6 className="text-2xl">Stake and Rank</h6>
            <table className="w-1/2 text-xl">
              <thead>
                <tr className="bg-gray-300">
                  <th className="text-left px-3 py-1">Rank</th>
                  <th className="text-left px-3 py-1">Min stake</th>
                  <th className="text-left px-3 py-1">Lock time</th>
                </tr>
              </thead>
              <tbody>
                {stakeInfo.length > 0 &&
                  stakeInfo.map((item) => {
                    return (
                      <tr key={item.rank}>
                        <td className="px-3 py-1 font-semibold">
                          {rankToText(item.rank)}
                        </td>
                        <td className="px-3 py-1">
                          {toNormalNumber(item.requireStake)}
                        </td>
                        <td className="px-3 py-1">
                          {Number(item.locktime._hex)} days
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        title="Setting stake"
        open={isOpenSettingStakeDialog}
        closable={false}
        footer={null}
        width={600}
      >
        <StakeSettingDialog />
      </Modal>
    </>
  )
})
