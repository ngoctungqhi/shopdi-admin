import { Col, Row } from 'antd'
import { CERTIFICATE } from 'configs/constants/constants'

export const Info = ({ ido }) => {
  return (
    <>
      <Row gutter={16}>
        <Col span={10}>
          <div className="flex flex-col gap-y-2">
            <p className="flex m-0 gap-x-5">
              <span className="w-1/3 block text-right">Website</span>
              <a href={ido.website} target="_blank" rel="noreferrer">
                {ido.website}
              </a>
            </p>
            <p className="flex m-0 gap-x-5">
              <span className="w-1/3 block text-right">Facebook</span>
              <a href={ido.facebook} target="_blank" rel="noreferrer">
                {ido.facebook}
              </a>
            </p>
            <p className="flex m-0 gap-x-5">
              <span className="w-1/3 block text-right">Telegram group</span>
              <a href={ido.telegramGroup} target="_blank" rel="noreferrer">
                {ido.telegramGroup}
              </a>
            </p>
            <p className="flex m-0 gap-x-5">
              <span className="w-1/3 block text-right">Telegram channel</span>
              <a href={ido.telegramChannel} target="_blank" rel="noreferrer">
                {ido.telegramChannel}
              </a>
            </p>
            <p className="flex m-0 gap-x-5">
              <span className="w-1/3 block text-right">Twitter</span>
              <a href={ido.twitter} target="_blank" rel="noreferrer">
                {ido.twitter}
              </a>
            </p>
            <p className="flex m-0 gap-x-5">
              <span className="w-1/3 block text-right">Instagram</span>
              <a href={ido.instagram} target="_blank" rel="noreferrer">
                {ido.instagram}
              </a>
            </p>
            <p className="flex m-0 gap-x-5">
              <span className="w-1/3 block text-right">Youtube</span>
              <a href={ido.youtube} target="_blank" rel="noreferrer">
                {ido.youtube}
              </a>
            </p>
            <p className="flex m-0 gap-x-5">
              <span className="w-1/3 block text-right">Tiktok</span>
              <a href={ido.tiktok} target="_blank" rel="noreferrer">
                {ido.tiktok}
              </a>
            </p>
          </div>
        </Col>
        <Col span={7}>
          <div className="flex flex-col gap-y-2">
            <p className="flex m-0 gap-x-5 items-center">
              <span className="w-1/2 block text-right">Logo</span>
              <img src={ido.logo} alt="" className="w-8 h-8 rounded-full" />
            </p>
            <p className="flex m-0 gap-x-5 items-center">
              <span className="w-1/2 block text-right">Banner</span>
              <img src={ido.banner} alt="" className="w-28 h-auto" />
            </p>
            <p className="flex m-0 gap-x-5">
              <span className="w-1/2 block text-right">Audit</span>
              <span>{ido.isAudit ? 'Yes' : 'No'}</span>
            </p>
            <p className="flex m-0 gap-x-5">
              <span className="w-1/2 block text-right">Certificate</span>
              <span>
                {ido.certificate
                  ? CERTIFICATE.find((item) => item.value === ido.certificate)
                      .label
                  : ''}
              </span>
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="flex gap-x-5 items-center mt-5">
            <span className="block text-right w-20">Description</span>
            <span>{ido.shortDescription}</span>
          </div>
          <div className="flex gap-x-5 items-center mt-5">
            <span className="block text-right w-20">Info</span>
            <div
              dangerouslySetInnerHTML={{
                __html: ido.info,
              }}
            />
          </div>
          <div className="flex gap-x-5 items-center mt-5">
            <span className="block text-right w-20">Team</span>
            <div
              dangerouslySetInnerHTML={{
                __html: ido.team,
              }}
            />
          </div>
        </Col>
      </Row>
    </>
  )
}
