'use client'

/** GSAP + plugins, registered once (client only). All plugins are free since GSAP 3.13. */
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, Flip, ScrollSmoother, ScrollToPlugin, ScrollTrigger, SplitText)

export { Flip, gsap, ScrollSmoother, ScrollToPlugin, ScrollTrigger, SplitText, useGSAP }
