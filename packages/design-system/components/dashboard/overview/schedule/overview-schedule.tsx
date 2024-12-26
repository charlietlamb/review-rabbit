import { Card } from '@remio/design-system/components/ui/card'
import OverviewScheduleHeader from './overview-schedule-header'
import OverviewScheduleDatePicker from './overview-schedule-date-picker'
import OverviewScheduleMonthPicker from './overview-schedule-month-picker'
import OverviewScheduleMediations from './overview-schedule-mediations'
import ClientSelectSlick from '@remio/design-system/components/dashboard/clients/client-select-slick'
import { useAtom } from 'jotai'
import { overviewScheduleClientAtom } from '@remio/design-system/atoms/dashboard/overview/overview-atoms'
import { useEffect, useState, useCallback } from 'react'

interface Dimensions {
  height: number | undefined
  isXlBreakpoint: boolean
}

export default function OverviewSchedule({
  sizeRef,
  dateOffset = 2,
  mediationsClassName,
}: {
  sizeRef?: React.RefObject<HTMLDivElement>
  dateOffset?: number
  mediationsClassName?: string
}) {
  const [client, setClient] = useAtom(overviewScheduleClientAtom)
  const [dimensions, setDimensions] = useState<Dimensions>({
    height: undefined,
    isXlBreakpoint: false,
  })

  const updateDimensions = useCallback(() => {
    if (!sizeRef?.current) return

    const mediaQuery = window.matchMedia('(min-width: 1280px)')
    const isXl = mediaQuery.matches

    setDimensions({
      height: isXl ? sizeRef.current.clientHeight : undefined,
      isXlBreakpoint: isXl,
    })
  }, [sizeRef])

  useEffect(() => {
    if (!sizeRef?.current) return

    // Initial update
    updateDimensions()

    // Setup observers
    const resizeObserver = new ResizeObserver(updateDimensions)
    const mediaQuery = window.matchMedia('(min-width: 1280px)')

    resizeObserver.observe(sizeRef.current)
    mediaQuery.addEventListener('change', updateDimensions)

    return () => {
      resizeObserver.disconnect()
      mediaQuery.removeEventListener('change', updateDimensions)
    }
  }, [updateDimensions])

  return (
    <Card
      className="flex flex-col p-2 gap-2 h-[600px] xl:h-auto"
      style={{
        height: dimensions.isXlBreakpoint ? dimensions.height : undefined,
      }}
    >
      <OverviewScheduleHeader />
      <OverviewScheduleMonthPicker />
      <OverviewScheduleDatePicker dateOffset={dateOffset} />
      <ClientSelectSlick value={client} setValue={setClient} className="mt-2" />
      <OverviewScheduleMediations className={mediationsClassName} />
    </Card>
  )
}
