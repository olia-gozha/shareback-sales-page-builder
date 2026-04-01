'use client'

import Button from '@/components/Button'

export default function CompanyProfile({
  page,
  status,
  createdLabel,
  onPreviewPage,
  onCopyLink,
  onCopySecretEditLink,
  className = '',
}) {
  const currentStatus = status || page.status
  const statusLabel = currentStatus
    ? currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)
    : '-'

  return (
    <div className={`shrink-0 bg-white bg-linear-to-b from-mist/9 to-mist/9 flex flex-col transition-all duration-200 border border-slate/12 rounded-lg p-7.5 gap-5 max-w-70 ${className}`.trim()}>
      <h2 className="font-normal text-sm leading-[125%] text-deep-charcoal/88">
        {page.company_name} profile
      </h2>

      <div className="flex flex-col gap-4.5">
        <div className="font-normal text-sm leading-[125%] flex flex-col gap-2.5">
          <span className="text-deep-charcoal/48">Created</span>
          <span className="text-deep-charcoal/88">{createdLabel}</span>
        </div>

        <div className="font-normal text-sm leading-[125%] flex flex-col gap-2.5">
          <span className="text-deep-charcoal/48">Status</span>
          <span className="text-deep-charcoal/88">{statusLabel}</span>
        </div>
      </div>

      <div className="flex flex-col items-start gap-1">
        <Button
          idleLabel="Preview page"
          onClick={onPreviewPage}
          variant="secondary"
          fullWidth={false}
          className="text-sm py-3! pr-4! pl-3!"
          showIcon={true}
          iconName="ArrowUpRight"
        />
        <Button
          idleLabel="Copy preview link"
          onClick={onCopyLink}
          actionType="copy"
          errorLabel="Copy failed"
          variant="secondary"
          fullWidth={false}
          className="text-sm py-3! pr-4! pl-3!"
          showIcon={true}
          iconName="Link"
        />
        <Button
          idleLabel="Copy secret edit link"
          onClick={onCopySecretEditLink}
          actionType="copy"
          errorLabel="Copy failed"
          variant="ghost"
          fullWidth={false}
          className="px-0! text-sm"
        />
      </div>
    </div>
  )
}