// Products Page JavaScript

// Mobile detection for better mobile experience
const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));

// Product categories mapping
const productCategories = {
    'neural-interface-systems': {
        folder: 'Neural Interface Systems',
        title: 'Neural Interface Systems'
    },
    'cybernetic-limb-replacements': {
        folder: 'Cybernetic Limb Replacements',
        title: 'Cybernetic Limb Replacements'
    },
    'ocular-enhancement-systems': {
        folder: 'Ocular Enhancement Systems',
        title: 'Ocular Enhancement Systems'
    },
    'neural-processing-units': {
        folder: 'Neural Processing Units',
        title: 'Neural Processing Units'
    },
    'dermal-armor-systems': {
        folder: 'Dermal Armor Systems',
        title: 'Dermal Armor Systems'
    }
};

// Product data structure
const products = {
    'neural-interface-systems': [
        { name: 'Model NIS-103 "AetherCore"', image: 'Model NIS-103 "AetherCore".png', specs: 'Model NIS-103 "AetherCore" specs.txt', price: 125000 },
        { name: 'Model NIS-128 "HaloSyn"', image: 'Model NIS-128 "HaloSyn".png', specs: 'Model NIS-128 "HaloSyn" specs.txt', price: 145000 },
        { name: 'Model NIS-209 "Erebus Prime"', image: 'Model NIS-209 "Erebus Prime".png', specs: 'Model NIS-209 "Erebus Prime" specs.txt', price: 185000 },
        { name: 'Model NIS-77 "CortexLink"', image: 'Model NIS-77 "CortexLink".png', specs: 'Model NIS-77 "CortexLink" specs.txt', price: 95000 },
        { name: 'Model NIS-91 "Synapse Forge"', image: 'Model NIS-91 "Synapse Forge".png', specs: 'Model NIS-91 "Synapse Forge" specs.txt', price: 115000 }
    ],
    'cybernetic-limb-replacements': [
        { name: 'Model CL-01 "Vanguard Arm"', image: 'Model CL-01 "Vanguard Arm".png', specs: 'Model CL-01 "Vanguard Arm" specs.txt', price: 75000 },
        { name: 'Model CL-09 "Ethereal Arm"', image: 'Model CL-09 "Ethereal Arm".png', specs: 'Model CL-09 "Ethereal Arm" specs.txt', price: 85000 },
        { name: 'Model CL-12 "Aegis Arm"', image: 'Model CL-12 "Aegis Arm".png', specs: 'Model CL-12 "Aegis Arm" specs.txt', price: 95000 },
        { name: 'Model CL-17 "Seraph Arm"', image: 'Model CL-17 "Seraph Arm".png', specs: 'Model CL-17 "Seraph Arm" specs.txt', price: 105000 },
        { name: 'Model CL-21 "Specter Arm"', image: 'Model CL-21 "Specter Arm".png', specs: 'Model CL-21 "Specter Arm" specs.txt', price: 115000 },
        { name: 'Model CL-32 "Obsidian Reign"', image: 'Model CL-32 "Obsidian Reign".png', specs: 'Model CL-32 "Obsidian Reign" specs.txt', price: 135000 },
        { name: 'Model CL-47 "Iron Dominion"', image: 'Model CL-47 "Iron Dominion".png', specs: 'Model CL-47 "Iron Dominion" specs.txt', price: 155000 },
        { name: 'Model CL-58 "Nightshade Warden"', image: 'Model CL-58 "Nightshade Warden".png', specs: 'Model CL-58 "Nightshade Warden" specs.txt', price: 175000 },
        { name: 'Model CL-62 "Eidolon Veil"', image: 'Model CL-62 "Eidolon Veil".png', specs: 'Model CL-62 "Eidolon Veil" specs.txt', price: 195000 }
    ],
    'ocular-enhancement-systems': [
        { name: 'Model OE-09 "Specter Core"', image: 'Model OE-09 "Specter Core".png', specs: 'Model OE-09 "Specter Core" specs.txt', price: 65000 },
        { name: 'Model OE-21 "Argus Orb"', image: 'Model OE-21 "Argus Orb".png', specs: 'Model OE-21 "Argus Orb" specs.txt', price: 75000 },
        { name: 'Model OE-37 "Inferno Sight"', image: 'Model OE-37 "Inferno Sight".png', specs: 'Model OE-37 "Inferno Sight" specs.txt', price: 85000 },
        { name: 'Model OE-450 "Omega Prime"', image: 'Model OE-450 "Omega Prime".png', specs: 'Model OE-450 "Omega Prime" specs.txt', price: 125000 }
    ],
    'neural-processing-units': [
        { name: 'Model NPU-212 "Crimson Vortex"', image: 'Model NPU-212 "Crimson Vortex".png', specs: 'Model NPU-212 "Crimson Vortex" specs.txt', price: 165000 },
        { name: 'Model NPU-88 "Cerebra Forge"', image: 'Model NPU-88 "Cerebra Forge".png', specs: 'Model NPU-88 "Cerebra Forge" specs.txt', price: 135000 },
        { name: 'Model NPU-99 "Eclipse Node"', image: 'Model NPU-99 "Eclipse Node".png', specs: 'Model NPU-99 "Eclipse Node" specs.txt', price: 155000 }
    ],
    'dermal-armor-systems': [
        { name: 'Model DAS-09 "Aegis Weave"', image: 'Model DAS-09 "Aegis Weave".png', specs: 'Model DAS-09 "Aegis Weave" specs.txt', price: 85000 },
        { name: 'Model DAS-14 "Helix Shroud"', image: 'Model DAS-14 "Helix Shroud".png', specs: 'Model DAS-14 "Helix Shroud" specs.txt', price: 105000 }
    ]
};

// Hardcoded product specifications
const productSpecs = {
    'Model NIS-103 "AetherCore"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Division of Synthetic Cognition
Model Code: NIS-103-AC
Generation: 6th-Gen Bio-Digital Neural Processor

Core Features

Neural Bandwidth: 36.4 Tbps bi-directional hybrid link

Latency: 0.02 ms full-cycle cognitive delay

Processor Array: 12-core quantum synaptic cluster with neural context caching

Material Composition: Reinforced nano-titanium alloy with carbon-lattice stabilization

Power Supply: High-density plasma cell with 96-hour operational uptime

Cooling System: Closed-loop phase-change thermoregulator

Encryption Protocol: NeuroLock X-12 synaptic obfuscation suite

Interface Connectors: Tri-port neural mesh dock, induction transfer coil, micro-pulse port

Performance Metrics
Parameter	Specification
Neural Sync Rate	99.993% sustained coherence
Signal Integrity	Class-Z5 quantum resonance
AI Fusion Index	118 adaptive cycles/sec
Stability Rating	12.4 hours error-free runtime under max load
Integration Notes

Designed for implantation at the parietal cortex base with adaptive tissue-mesh alignment

Includes real-time biofeedback regulator to prevent cognitive drift

Fully integrates with all NeuroSkin Cortex series devices

Firmware allows selective personality compartmentalization for multi-agent operation

Optional "Overmind Protocol" enables simultaneous interface with multiple neural networks (restricted to corporate or military use)`,
    'Model NIS-128 "HaloSyn"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Experimental BioFusion Division
Model Code: NIS-128-HS
Generation: 7th-Gen NeuroSynaptic Hybrid Interface

Core Features

Neural Bandwidth: 42.7 Tbps adaptive bi-lateral cognitive transmission

Latency: 0.01 ms total propagation delay

Processor Architecture: Tri-cluster Quantum Bio-Core with dynamic neural waveform mapping

Material Composition: Poly-alloy titanium with bio-synthetic carbon shell and nano-lattice underlayer

Power Source: Hydrogen-infused microcell array with 120-hour operational life per charge

Cooling System: Neurogel liquid interface with phase-responsive thermal control

Encryption Protocol: NS QuantumLock v5.3 (multi-threaded neuron-level encryption)

Interface Ports: Modular neural link, magneto-inductive relay, optical uplink node

Performance Metrics
Parameter	Specification
Neural Coherence	99.9991% stability at peak load
Data Integrity	Class Z+ Signal Fidelity
Cognitive Amplification	5.4x baseline human processing rate
Error Tolerance	A0.00004% over continuous 48-hr cycles
Integration Notes

Designed for cortical embedding along the upper occipital ridge

Utilizes translucent synapse mesh for bioelectrical resonance and regenerative healing

Auto-calibrates during REM cycles for cognitive pattern alignment

Includes embedded sublayer AI ("Helix Core") for micro-decision optimization

Supports multi-threaded consciousness streaming between compatible NeuroSkin units`,
    'Model NIS-209 "Erebus Prime"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Black Horizon Division
Model Code: NIS-209-EP
Generation: 9th-Gen Quantum-Neural Apex Interface

Core Features

Neural Bandwidth: 64.9 Tbps tri-phase bidirectional transmission

Latency: 0.004 ms absolute propagation delay

Processor Core: Hexa-matrix Quantum Cortex Array with real-time predictive adaptation

Construction Material: Tungsten-carbon exoshell with layered nano-diamond insulation

Power Source: Dual-phase antimatter capacitor with 216-hour sustained runtime

Cooling System: Self-regulating nano-liquid thermoptic cycle

Encryption Suite: NeuroSkin HyperLock Q-13 Encryption with bio-synaptic firewall

Connectivity: Triplex neural conduits, photon uplink channel, and adaptive wireless resonance

Performance Metrics
Parameter	Specification
Neural Synchronization	99.99997% sustained coherence
Cognitive Amplification	8.2x baseline processing capacity
Memory Expansion Rate	12.4 exabytes/sec throughput
Overdrive Mode	Autonomous neural acceleration for combat or high-stress scenarios
Integration Notes

Designed for deep cranial fusion through cortical ossification scaffolding

Features active-response micro-tendril anchors that bond to gray matter channels

Embedded tri-AI co-pilot ("Prometheus Cluster") handles motor, perception, and defense systems independently

Includes emergency blackout protocol that wipes all neural traces in 0.2 seconds if compromised

Restricted to military, black-budget research, and upper-corporate contractors under Tier-0 clearance`,
    'Model NIS-77 "CortexLink"': `Technical Specifications

Manufacturer: NeuroForge Systems — Experimental Division
Model Code: NIS-77-CL
Generation: 4th-Gen Adaptive Neural Mesh

Core Features

Neural Bandwidth: 24.8 Tbps adaptive quantum-encoded data stream

Latency: 0.09 ms cognitive transmission delay

AI Synchronization: Compatible with NeuroForge OS v3.2 and Bella Companion AI

Cognitive Mesh: 8192 micro-filament electrodes woven into a graphene-titanium composite membrane

Thermal Regulation: Liquid nanogel cooling with passive biofeedback dampening

Power Source: Micro-cellular plasma core (72 hr continuous runtime)

Encryption: Q-Lock Neurocrypt AES-X4 hybrid shield (military-grade)

Interface Ports: Dual optical link, mag-sealed neural jack, inductive uplink node

Performance Metrics
Category	Rating
Cognitive Sync Efficiency	99.982%
Signal Fidelity	Ultra-Stable (Class A-7)
Adaptive Learning	Self-tuning neural pathways
Safety Protocol	Failsafe Isolation Mode v2.1
Installation Notes

Subdermal integration via occipital socket array

30-minute auto-bond calibration sequence

Full sync achieved after 12 hours of REM cycle operation`,
    'Model NIS-91 "Synapse Forge"': `Technical Specifications

Manufacturer: Neuroskin Systems — Military Research Unit
Model Code: NIS-91-SF
Generation: 5th-Gen Synaptic Fusion Array

Core Features

Neural Bandwidth: 31.2 Tbps bi-directional signal transfer

Latency: 0.04 ms total transmission delay

Processor Core: Dual Quantum Tensor Cores with adaptive cognitive co-processing

Material Composition: Tungsten-carbon shell reinforced with graphene nanoweb matrix

Cooling System: Vapor-phase microchannel thermal control grid

Power Supply: Inductive nano-cell array with 5-day continuous cycle

Encryption Protocol: Tier-9 NeuroMesh quantum encryption

Interface Options: Optical uplink, wireless Q-signal antenna, neural-dock port

Performance Metrics
Category	Specification
Cognitive Stability	99.998% sustained sync
Signal Integrity	Quantum-locked fidelity
Overclock Threshold	112% adaptive neural throughput
Failover Safety	Dual-circuit redundancy with soft reboot sequence
Integration Notes

Implanted behind upper temporal lobe with carbon fiber underlay

Fully integrates with Neuroskin CortexLink series devices

Firmware auto-calibrates to host's neurochemical patterns within 4 REM cycles

Optional "Redline Mode" allows enhanced reflex processing at risk of synaptic strain`,
    'Model CL-01 "Vanguard Arm"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Applied Biomechanics Division
Model Code: CL-01-VA
Generation: 3rd-Gen Reinforced Augmentation Framework

Core Features

Material Composition: High-density carbon-titanium hybrid alloy with synthetic muscle fibers

Power Source: Dual-core microfusion reactor with 72-hour charge cycle

Hydraulic System: Magneto-hydraulic servo system with instantaneous torque response

Load Capacity: 1,200 kg lift rating under sustained strain

Neural Interface: Direct cortex uplink through NeuroSkin's NIS integration standard

Cooling Mechanism: Subdermal micro-vent array with adaptive thermoregulation

Armor Rating: Class-IV impact resistance with reactive plating mesh

Haptic Feedback: 48,000 tactile sensors providing near-organic sensitivity

Performance Metrics
Parameter	Specification
Reaction Time	0.006 seconds (neural impulse to motion)
Grip Strength	5.2x baseline human limit
Flex Endurance	3.1 million motion cycles
Durability Index	97.8% after simulated combat conditions
Integration Notes

Compatible with all NeuroSkin Neural Interface Systems (NIS-77 and above)

Integrated combat-mode safety lock to prevent synaptic overload

Self-calibrating servos allow full reattachment and alignment in under 10 minutes

Optional Overdrive Module available for military or industrial-grade use

Includes concealed tool bay for modular weapon or utility attachments`,
    'Model CL-09 "Ethereal Arm"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — BioHybrid Division
Model Code: CL-09-EA
Generation: 5th-Gen Organic-Synthetic Integration Platform

Core Features

Exterior Material: NeuroDerm synthetic epidermis with self-healing nanofiber lattice

Muscle System: BioFlex myomer strand network reinforced with carbon nanotube bundles

Power Source: Bio-reactive microcell array drawing residual kinetic and thermal energy from the user's body

Joint Mechanism: Precision servo-motors with magnetic coupling for frictionless articulation

Sensory System: 128,000 adaptive micro-sensors for temperature, pressure, and haptic feedback

Circulatory Cooling: Internal microfluidic channels circulate thermoelectric coolant through dermal layers

Connectivity: Direct cortical interface via NeuroSkin NIS-103 or higher neural mesh standards

Performance Metrics
Parameter	Specification
Strength Output	3.8x baseline human capacity
Sensory Resolution	99.7% tactile fidelity
Regeneration Cycle	12 hours for dermal reformation after damage
Power Retention	84 hours continuous use without recharge
Neural Sync Delay	0.009 milliseconds
Integration Notes

Designed for high-fidelity social or civilian integration while retaining full cybernetic function

Exterior mimics natural skin tone with optional pigmentation and texture matching

Synthetic dermal layer conceals carbon-alloy reinforcement seams for minimal detection

Auto-calibration module learns user motion habits for personalized motion prediction

Compatible with emotional feedback sensors for AI-assisted empathy simulations`,
    'Model CL-12 "Aegis Arm"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Advanced Defense Systems Division
Model Code: CL-12-AA
Generation: 6th-Gen Reinforced Combat-Grade Augmentation

Core Features

Material Composition: Aero-titanium exoskeletal plating with tungsten-hybrid bone lattice

Actuation System: Dual-channel magnetic servo actuators with micro-hydraulic precision control

Power Core: Triaxial fusion cell (rated for 180 continuous operational hours)

Control Interface: Quantum neural sync module with full muscle memory mirroring

Cooling Architecture: Cryo-gel thermal dissipation mesh woven beneath surface plating

Force Output: 1,800 kg compression resistance and 1,000 kg dynamic lift capability

Sensory Array: 72,000-point adaptive haptic feedback grid integrated along palm and forearm

Protection Layer: EMP-hardened circuitry and ballistic-resistant polymeric coating

Performance Metrics
Parameter	Specification
Reaction Time	0.004 seconds (neural impulse latency)
Grip Strength	6.7x standard human maximum
Motion Accuracy	99.9993% under full torque strain
Structural Integrity	98.4% retention after 50 simulated combat engagements
Integration Notes

Engineered for high-intensity environments and frontline operations

Compatible with NeuroSkin NIS-128 "HaloSyn" and NIS-209 "Erebus Prime" neural systems

Internal skeletal actuators include adaptive torque balancing for precision and recoil dampening

Optional modular upgrades include forearm energy shield, weapon interface, or industrial utility clamps

Field-maintenance ports allow rapid coolant replacement and firmware recalibration within 90 seconds`,
    'Model CL-17 "Seraph Arm"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Apex Biomechatronics Division
Model Code: CL-17-SA
Generation: 8th-Gen Platinum-Class Bio-Mechanical Hybrid

Core Features

Material Composition: Polished chrome-titanium framework with plasma-treated nano-carbon reinforcement

Power System: Dual-core photonic capacitor array with self-recharging induction

Muscle Network: Quantum-thread servo muscles interlaced with synthetic myofiber tension nodes

Neural Architecture: Tri-synaptic response hub integrated with NIS-209 "Erebus Prime" and NIS-128 "HaloSyn" mesh

Sensory Layer: CryoNano haptic grid with 0.001 mm precision response feedback

Energy Conduits: Aurora-line bioluminescent channels for heat regulation and data transfer

Control Interface: Quantum tactile relay with cortical overclock capability

Performance Metrics
Parameter	Specification
Strength Output	7.4x baseline human limit
Neural Response	0.002 ms cognitive delay
Durability Rating	99.1% structural integrity under ballistic stress
Energy Efficiency	92% conversion ratio per charge cycle
Dexterity Index	0.9998 precision calibration threshold
Integration Notes

Designed for elite operatives, high-ranking corporate enforcers, and experimental users

Exterior plating features active reflection modulation for stealth and intimidation effects

Quantum-thread architecture allows direct sensory blending with AR/VR neural overlays

Optional modular port allows forearm weapon integration or surgical precision toolsets

Complies with NeuroSkin's "Cognitive Stability Act" for high-capacity mental interfacing`,
    'Model CL-21 "Specter Arm"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — BioAdaptive Systems Division
Model Code: CL-21-SA
Generation: 9th-Gen Human-Simulation Augmentation Platform

Core Features

Exterior Layer: NeuroSkin V5 synthetic dermis with dynamic pigmentation and micro-healing nanopolymer

Internal Structure: Titanium-V polymerized bone framework with fiberoptic neural bundles

Power System: Bioelectric hybrid array capable of drawing kinetic and thermal charge from user activity

Neural Interface: BioLink cortical mesh supporting direct integration with NIS-128 and higher

Haptic Feedback: 240,000 micro-sensory nodes with adaptive texture replication

Thermal Regulation: CryoCell micro-chamber cooling network beneath the dermal layer

Security Protocol: Cortex-Guard V2 encryption against unauthorized neural access

Performance Metrics
Parameter	Specification
Reaction Speed	0.006 ms neural relay time
Sensory Resolution	99.93% human equivalence
Strength Output	4.5x human average
Power Efficiency	91% conversion rate
Regeneration Time	8 hours per 2% dermal damage
Integration Notes

Designed for near-human mimicry while maintaining combat-ready durability

Exterior skin adapts in tone, moisture, and texture to environmental conditions

Sub-dermal bioluminescent veins glow faintly during overclock or stress response

Features silent magnetic servos for organic motion and low acoustic detection

Optional "PersonaSync" module allows emotional expression mapping for realistic gesture feedback`,
    'Model CL-32 "Obsidian Reign"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Dominion Warfare Division
Model Code: CL-32-OR
Generation: 12th-Gen Heavy-Duty Tactical Augmentation Platform

Core Features

Chassis Composition: Obsidium-T composite plating reinforced with layered nano-titanium shell and reactive armor microfibers

Skeletal Framework: Ferrocarbon bone lattice fused with diamond-synth ligaments for unmatched tensile strength

Power System: Trinary-core fusion microreactor with autonomous kinetic regeneration unit

Hydraulic Architecture: Dual-stage magneto-fluidic system allowing instantaneous torque adjustment up to 7.8 tons of pressure per limb

Neural Interface: Quantum Synapse Relay v9.4 — integrated with NIS-209 "Erebus Prime" and next-gen Q-cortex neural mesh

Cooling System: Cryo-phase subdermal coolant channels with thermal discharge vents along triceps ridge

Combat Shielding: EMP-resistant circuitry coated with plasma-reactive insulation, hardened against ion interference

Performance Metrics
Parameter	Specification
Strength Output	9.7x human baseline
Response Latency	0.0018 ms
Structural Endurance	99.994% integrity after 400 kinetic impacts
Power Autonomy	276 operational hours per fusion cycle
Precision Index	0.00003 variance in targeting calibration
Integration Notes

Classified military-grade augmentation reserved for Tier-0 operatives and black-ops contractors

Full-body synchronization possible when paired with NeuroSkin "Helios Spine" or "Erebus Prime" neural systems

Adaptive muscle fibers reconfigure density based on user's combat stance or load-bearing profile

Overdrive protocol ("Reign Mode") enables temporary quadruple torque output for 14 seconds, with bio-risk warnings suppressed

Proprietary "Neural Blackseal" firmware prevents external tampering and enforces single-user neural imprint`,
    'Model CL-47 "Iron Dominion"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Dominion Warfare Division
Model Code: CL-47-ID
Generation: 13th-Gen Enhanced Combat Mobility Platform

Core Features

Chassis Composition: Ferro-Obsidium alloy plating fused with nano-reactive polymer mesh, built for impact resistance and adaptive flexibility under duress

Skeletal Framework: Reinforced titanium-carbon exoskeletal spine with self-healing graphene joint rings for longevity and silent movement

Power System: Quad-cell hyper-fusion core integrated with piezoelectric kinetic recapture coils to sustain uninterrupted combat uptime

Hydraulic Architecture: Neuro-responsive tri-valve pressure matrix capable of delivering up to 8.3 tons of reactive torque within 0.02 seconds

Neural Interface: NEX-Q SynLink 10.2 — synchronized with "Helios Spine" architecture and compatible with full-body NeuroSkin systems

Cooling System: Cryo-loop nano-circulatory conduits with vented micro-ribs along femoral housing to regulate reactor heat output

Combat Shielding: Multi-layer electromagnetic shielding and plasma-coated heat dispersion barriers designed for EMP suppression

Performance Metrics
Parameter	Specification
Strength Output	10.2x human baseline
Response Latency	0.0012 ms
Structural Endurance	99.998% integrity after 500 kinetic impacts
Power Autonomy	314 hours per hyper-fusion cycle
Precision Index	0.00002 variance in motion calibration
Integration Notes

Designed for Tier-0 elite infiltration units and high-mobility shock operatives

Seamless synchronization with NeuroSkin "Helios Spine", "Reign Core," or Erebus Prime frameworks

Smart tissue micro-actuators shift weight distribution in real time to maximize agility

Overdrive protocol ("Dominion Surge") boosts all torque channels by 440% for 16 seconds before cooldown initiation

Embedded "Neural Blackseal" security lattice enforces single-user imprint, rendering external rewiring or cloning impossible`,
    'Model CL-58 "Nightshade Warden"': `Technical Specifications

Manufacturer: NeuroSkin
Model Code: CL-58-NSW
Generation: 11th-Gen Adaptive Stealth Mobility Platform

Core Features

Chassis Composition: Adaptive obsidian-infused cerametal shell layered over micro-flex polymer; low-glint matte finish with reactive surface microtexturing for reduced radar/optical signature

Skeletal Framework: Nano-filament ferroframe with tensioned lattice ligaments (Graphene weave reinforcement) for torsional damping and micro-vibration isolation

Power System: Dual micro-fusion cell array with backup ultracapacitor ring and regenerative piezoelectric harvesters embedded in foot pads

Hydraulic Architecture: Bio-tuned magneto-hydraulic microactuators with four-zone pressure modulation allowing smooth microadjustments and high torque bursts (burst modulation for sprint/impact phases)

Neural Interface: NeuroSkin SynapseLink v7.7 — layered Q-mesh interface with adaptive impedance matching and biometric neural fingerprinting; supports optional direct NIS backbone integration

Cooling System: Phase-change microcell coolant network with self-purging vent valves and heat sink microfins hidden beneath outer panels

Combat Shielding: Multi-strata EMP dampening foil, plasma-resistant varnish, and surge isolation nodes; passive thermal masking layer for IR profile reduction

Tactile / Haptics: Multi-zone haptic nodes and tactile feedback array along shin and foot to deliver refined proprioceptive signals and ground texture sensing

Maintenance Access: Magnetic quick-release hatch panels with self-diagnostic port and encrypted firmware USB/optical console (service mode requires dual-factor NeuroSkin auth)

Performance Metrics

Parameter	Specification
Strength Output	8.9x human baseline (sustained), 24x burst (Overdrive)
Response Latency	0.0019 ms (neural loop — low-latency mode)
Structural Endurance	99.989% integrity after 350 kinetic impacts (MIL-sim stress test)
Power Autonomy	198 operational hours (normal) / 3.2 hours (continuous Overdrive)
Precision Index	0.000028 variance in micro-actuator positioning

Integration Notes

• Designed for covert ops, recon units, and urban operators requiring a balance of stealth and mobility.
• Full-body sync available when paired with NeuroSkin "Warden Spine" or SynapseLink backbones; reduced latency and shared power pooling when linked.
• Adaptive gait matrix reconfigures actuator timing to match surface type (asphalt, concrete, rubble, water-slick), improving stability and reducing trip events.
• "Shadowstride" protocol engages dynamic micro-dampening and heat-masking — reduces audible mechanical profile and IR signature for up to 9 minutes per activation (cooldown enforced).
• Firmware includes tamper-resistant NeuralSeal v3 and per-user biometric lock; authorized upgrades only via NeuroSkin certified terminals.
• Environmental rating: IP68 salt/ dust ingress protection; certified for -30°C to +65°C operational range.

Restrictions & Warnings

• Overdrive/Shadowstride extended use increases thermal stress on microcells and shortens expected cycle life; operator advisories and auto-limiter will engage under unsafe conditions.
• NeuroSkin single-user imprint prevents unauthorized pairing; forced overrides require factory clearance and full biometric re-enrollment.`,
    'Model CL-62 "Eidolon Veil"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Bio-Mechanical Augmentation Division
Model Code: CL-62-EV
Generation: 9th-Gen Bio-Synthetic Adaptive Limb Platform

Core Features

Chassis Composition: Dual-phase dermal composite—synth-organic skin layer reinforced with dermofiber mesh and carbonized titanium microplates beneath the surface for ballistic resistance

Skeletal Framework: Biofused titanium lattice with hybridized myomer bundles simulating natural musculature tension and elasticity

Power System: HelioCell bio-reactive generator powered by micro-fusion nanocells and hemofluid energy recyclers drawn from synthetic vascular channels

Hydraulic Architecture: Smoothflow BioTorque pistons delivering 6.7 tons of distributed force; dynamically modulated via user's nervous signals for precise movement

Neural Interface: Q-Neural SynchroNet v8.5 — full biofeedback integration allowing pain-suppressed control and simulated sensory input through epidermal signal translators

Cooling System: Subdermal cryo-gel reservoir system with automatic phase cycling to prevent heat saturation under continuous load

Combat Shielding: EMP-insulated neural mesh; plasma-hardened understructure provides anti-shock reinforcement and dampened signal signature for stealth ops

Dermal Surface: RealSkin+ 4.0 synthetic tissue replicates pore structure, micro-hair patterns, and sweat response for full biometric mimicry; removable graft layers enable aesthetic customization

Performance Metrics
Parameter	Specification
Strength Output	6.7x human baseline (adaptive boost up to 9x)
Response Latency	0.0021 ms
Structural Endurance	99.972% integrity after 300 kinetic impacts
Power Autonomy	192 operational hours per charge cycle
Precision Index	0.00005 variance in motor coordination
Sensory Fidelity	92.8% equivalence to natural limb haptics
Integration Notes

Engineered for civilian-military hybrid users requiring natural appearance without sacrificing mechanical performance

Fully compatible with NeuroSkin "Aurora Spine", "Erebus Prime," and "Helios Synapse" systems

Self-healing dermal polymer layer regenerates micro-tears and abrasions within 48 hours under standard environmental conditions

"Veil Mode" activation cloaks heat and EM output while reducing actuator noise by 80% for stealth operations

Emergency override allows autonomous limb operation for up to 4 hours if neural link is severed

NeuroSkin proprietary BioSeal™ encryption layer prevents firmware tampering or forced biometric rebinds

Operational Advisory

Designed for infiltration, espionage, and high-profile replacement therapy where human likeness is critical

Recommended for Tier-1 field operatives, undercover android proxies, and high-risk corporate liaisons

Extended exposure to corrosive environments requires reapplication of DermalShield compound every 160 hours of field use`,
    'Model OE-09 "Specter Core"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Visionary Systems Division
Model Code: OE-09-SC
Generation: 7th-Gen Tactical Reconnaissance Ocular Platform

Core Features

Optic Composition: Reinforced quartz-carbon lens encased in poly-alloy housing with plasma-coated anti-reflective treatment and bio-reactive iris calibration

Sensory Framework: Adaptive multi-spectrum sensor array capable of simultaneous visual acquisition across infrared, ultraviolet, thermal, and electromagnetic spectra

Power System: Micro-fusion optical core with self-sustaining power relay through kinetic and bioelectric harvesting

Neural Interface: Q-Synapse 11.0 Direct Link — full duplex neural data relay with 0.0008 ms response time and built-in cognitive overload dampener

Processing Unit: Hexa-threaded Neural Compute Cluster integrated within the orbital cavity; features onboard object tracking, facial recognition, and threat mapping AI

Cooling System: Microfluidic coolant lines surrounding optic core; thermally adaptive nanogel prevents burnout during extended overclocked visual sessions

Visual Display: Transparent retinal HUD projection capable of displaying environmental telemetry, target acquisition markers, and holographic overlays directly on the cornea

Connectivity Suite: Encrypted neuro-signal uplink (NS-Link) supporting satellite relay, tactical network integration, and augmented communication streaming

Performance Metrics
Parameter	Specification
Visual Resolution	6700x4700 adaptive per-eye equivalent
Neural Latency	0.0008 ms
Spectral Range	0.15–1350 nm (infrared–ultraviolet)
Power Autonomy	423 operational hours
Target Acquisition Speed	0.0043 sec
Threat Recognition Accuracy	99.9982%
Environmental Tolerance	-40°C to +85°C (sealed environment)
Integration Notes

Designed for Tier-1 tactical operatives and cybernetic intelligence specialists

Fully compatible with NeuroSkin "Helios Spine", "Dominion Net," and Erebus Prime systems

Auto-calibrates based on user's neurochemical balance and circadian rhythm

"Specter Mode" enables cloaked visual output, masking heat and EM signature from hostile scanners

Includes memory imprint firewall, protecting user from visual data corruption and neural hijacking

Ocular sync algorithms optimize with user's secondary cybernetic systems for unified sensory feedback

Operational Advisory

Extended use of Specter Mode (>30 min) may cause temporary visual desaturation or neural ghosting

Unauthorized extraction triggers Blackseal Protocol, rendering the optic core inert

Optical data logs are encrypted with NeuroSkin's TriaxCipher — classified for military-grade networks only`,
    'Model OE-21 "Argus Orb"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Visionary Systems Division
Model Code: OE-21-AO
Generation: 10th-Gen Spherical Ocular Prosthesis Platform

Core Features

Optic Form Factor: Self-contained spherical ocular unit (25 mm diameter) with polished synthetic sclera exterior and recessed lens aperture; designed for direct orbital socket implant or cranial modular mount.

Lens Assembly: Multi-aperture crystalline iris with variable-aperture micro-diaphragm and concentric adaptive refractive rings — supports both analog-like focus and discrete digital zoom steps.

Sensor Suite: Multi-spectrum imaging array (visible / near-IR / thermal / UV) fused on-chip with depth-field LIDAR microbeams and short-range radar scatter for 3D mapping.

Optical Processing Unit: Embedded NeuroCore APU (neuro-optimized DSP + GPU microcluster) with edge-AI for real-time object recognition, motion prediction, low-light denoising, and synthetic contrast enhancement.

Neural Interface: Bi-directional SynLink Optical Bus v9 — tactile and visual neural feedback with encrypted neural handshake and impedance-matched electroretinal contact pads.

Power System: Micro-helio cell with capacitor burst ring; supports passive kinetic harvest from ocular micro-motors and emergency optical scavenging through ambient light cells.

Cooling & Protection: Microfluid microchannel lattice around optic core paired with phase-change nanogel reservoir; hard ceramic outer ring with EMP-diffusion braid.

Optic Nerve Cabling: Reinforced braided optic conduits (flex-fiber + micro-coax) exit posterior housing as multiple cyber-optic nerves for direct cranial routing; quick-seal magnetic coupling for maintenance.

Haptics & Feedback: Retina-level tactile emulator for contrast / texture cues plus depth-haptic pulse for proximity warnings.

Firmware & Security: NeuroSkin TriaxCipher encrypted firmware with single-user biometric binding, Blackseal anti-tamper, and a failsafe cold-boot lockdown.

Performance Metrics

Parameter — Specification
Visual Resolution — Equivalent to 8500 x 5600 adaptive pixels (per-eye dynamic upscaling)
Neural Latency — 0.0006 ms (neural loop with SynLink v9)
Spectral Range — 0.18 nm (UV) — 2500 nm (SWIR/thermal overlap)
Zoom Range — 1.0x — 60.0x optical-equivalent (combined lens + digital fusion)
Low-Light Sensitivity — -9 EV (with AI denoise fusion)
Power Autonomy — 360 hours standby / 24 hours mixed use / 5 min full overclock burst per charge cycle
Thermal Tolerance — -40°C to +90°C (sealed unit)
Environmental Rating — IP69K dust/water ingress resistance with biocompatible sealing

Integration Notes

• Designed for covert recon, surgical prosthesis, and elite operator augmentation.
• Plug-and-play sync with NeuroSkin "Helios Spine", "Dominion Net", and OE-series hub controllers; supports multi-eye array linking for panoramic stitching.
• Dynamic exposure and shutter management coordinates with implanted auditory implants to reduce sensory overload.
• Optional add-on modules: Secure Comms Beacon, Stealth IR Masking, and Retinal Data Buffer (128 GB encrypted).
• Quick-release magnetic posterior coupling enables clinic-level swap/repair without full cranial surgery when used with approved mounting frames.

Operational Advisory

• Specter Mode (EM/IR cloaking) available but limited to 9 minutes per activation to prevent thermal runaway; enforced cooldown required.
• Unauthorized extraction triggers Blackseal kill switch rendering data and optics inert; factory re-provisioning required.
• Cosmetic scleral overlays available through certified clinics; strong adhesives or third-party grafting void warranty and may trigger neural miscalibration.
• Recommended maintenance: NeuroSkin certified inspection every 12 months (or every 200 operational flight hours for high-use scenarios).`,
    'Model OE-37 "Inferno Sight"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Dominion Warfare Division
Model Code: OE-37-IS
Generation: 12th-Gen Thermal-Integrated Combat Vision Platform

Core Features

Optic Construction: Reinforced obsidian-carbon ocular shell with adaptive micro-fiber veins to simulate organic tissue; synthetic sclera reinforced with ballistic-grade nanoceramic mesh

Lens Assembly: Multi-layered flame-spectrum iris composed of luminal crystal lenses and gold-plated precision rings; designed to regulate refraction under high-temperature or combat environments

Sensor Matrix: Integrated Quad-Vision Array — captures optical, infrared, ultraviolet, and electromagnetic signatures simultaneously for full-spectrum battlefield awareness

Processing Core: NeuroSkin Fusion Processor v12.6 with hybrid quantum-silica logic gates; capable of 6.2 trillion visual computations per second with predictive motion analytics

Neural Interface: SynLink-Prime v11.3 — full sensory-motor feedback with adaptive emotional filtering; customizable threat-prioritization overlays via neural impulse recognition

Power System: Dual-phase nano-reactor powered by photonic recharge cells and microcapacitor pulse relays; allows indefinite operation under standard light exposure

Cooling & Protection: Internal cryo-phase fluid network regulating thermal balance; armor-shielded optic housing resistant to EMP, plasma bursts, and corrosive particulates

Optic Nerve Cluster: Multi-conduit braided cyberoptic cables with graphene-core insulation; capable of direct cranial link or wireless synchronization via encrypted sub-dermal hub

Performance Metrics
Parameter	Specification
Visual Resolution	9200x6400 adaptive pixels
Neural Latency	0.0004 ms
Spectral Range	0.12–2450 nm (Full Thermal + EM)
Power Autonomy	486 hours (continuous use)
Optical Zoom	1x–80x optical + 120x digital hybrid
Motion Prediction Accuracy	99.9993% at 240 fps neural-processed frame rate
Structural Endurance	99.997% integrity after 800 kinetic impacts
Integration Notes

Built for Tier-0 tactical operatives, high-risk military augmentation, and long-range recon specialists

Fully compatible with NeuroSkin "Helios Spine," "Reign Cortex," and Dominion Neural Suite

Equipped with "Inferno Mode", enhancing visual acuity under extreme light, thermal distortion, or atmospheric interference

Overdrive protocol allows short-term predictive targeting and projectile tracing within 0.1° accuracy deviation

Synchronized tactical HUD integration with real-time battlefield telemetry and biometric overlays

Protected by Blackseal Mk.VI encryption layer — prevents external data siphoning or neural infiltration

Operational Advisory

Continuous Inferno Mode activation exceeding 15 minutes may induce temporary retinal desaturation

Unauthorized firmware tampering activates Failsafe Burnout, permanently disabling optical processors

Environmental compatibility: deep-space, arctic, desert, and urban conflict zones (certified to ISO-NR7 standards)

Maintenance cycle recommended every 500 operational hours under NeuroSkin supervision

Summary:
The OE-37 "Inferno Sight" represents the pinnacle of combat-grade ocular engineering — engineered for operatives who see not only through darkness, but through deception itself.`,
    'Model OE-450 "Omega Prime"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Orbital Systems Division
Model Code: OE-450-OP
Generation: 11th-Gen Spherical Combat & Recon Ocular Prosthesis

Core Features

Optic Form Factor: Self-contained spherical ocular module (26 mm diameter) with reinforced synthetic sclera and recessed orbital flange for modular cranial mounting. Exterior panels finished in matte ceramic-composite to reduce glare.

Iris / Logo Assembly: Programmable concentric logo iris — illuminated circular emblem ring (user-configurable) that serves both as targeting reticle and identity hologram. Iris supports micro-aperture segmentation for variable optical profiles.

Imaging Suite: FusionSight sensor matrix combining multi-spectrum CMOS (visible), SWIR photodiodes, thermal bolometers and micro-LIDAR time-of-flight array for instantaneous 3D scene reconstruction.

Optical Processing Unit: NeuroCore Edge APU with dedicated vision tensor engine and low-latency predictive frame synthesizer; onboard edge AI for object classification, motion extrapolation, and adaptive noise suppression.

Neural Interface: SynLink Orbital v10 — bi-directional electro-retinal contact pads with impedance matching and encrypted neuro-handshake. Supports haptic microfeedback and visual-audio crosslinking.

Power & Harvesting: Micro-photonic cell ring with ultracapacitor burst buffer; passive ambient light harvesting and kinetic microgenerators embedded in mounting flange for trickle recharge.

Cooling & Durability: Microfluidic thermal lattice with phase-change microcells and protective EMP diffusion braid; ceramic outer ring resists abrasion and corrosive agents.

Optic Nerve Cabling: Multi-conduit braided optic harness (micro-coax + fiber) exits posterior housing as flexible cyber-optic nerves with magnetic quick-couple ports for clinic servicing.

Security & Firmware: TriaxCipher firmware with single-user biometric binding, Blackseal anti-tamper protocol, and secure boot with hardware root of trust.

Auxiliary: Onboard encrypted data buffer (64 GB), optional comms beacon module, and removable cosmetic scleral overlays for appearance matching.

Performance Metrics

Parameter — Specification
Visual Resolution — Equivalent to 8800 x 6000 adaptive pixels (dynamic upscaling)
Neural Latency — 0.0005 ms (neural loop via SynLink Orbital v10)
Spectral Range — 0.18 μm (UV) — 2.5 μm (SWIR/thermal overlap)
Zoom Range — 1x — 70x optical-equivalent (hybrid lens + digital fusion)
Low-Light Sensitivity — -8 EV (AI-fusion assisted)
Target Acquisition Speed — 0.003 s
Power Autonomy — 420 hours standby / 28 hours mixed use / 8 min full overclock burst per charge cycle
Environmental Rating — IP69K equivalent (sealed implant variant available)
Operating Temp — -40°C to +95°C

Integration Notes

• Designed for tactical recon, surgical prosthesis, and elite operative augmentation.
• Plug-and-play synchronization with NeuroSkin "Helios Spine," OE-series hubs, and Dominion Neural Suite.
• Circular logo iris acts as visual key: when networked, it projects a short, rotating SIGID for authorized device handshake.
• Onboard predictive stabilization synchronizes with limb/torso actuators for reduced motion parallax.
• Clinic-grade magnetic quick-couple enables module swaps without full cranial extraction when used with certified mounting frames.

Operational Advisory

• "Omega Mode" (high-sensitivity predictive overlay) limited to short bursts (default 9 minutes) to avoid thermal strain; enforced cooldown engages automatically.
• Unauthorized removal or tampering triggers Blackseal lockdown, rendering optics and encrypted logs inert until factory re-provisioning.
• Cosmetic scleral overlays and third-party grafting void warranty and may compromise neural calibration.
• Recommended maintenance: NeuroSkin certified inspection every 12 months or every 300 operational hours under heavy use.`,
    'Model NPU-212 "Crimson Vortex"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Dominion Cybernetics Division
Model Code: NPU-212-CV
Generation: 10th-Gen Quantum Reactive Neural Matrix

Core Features

Architecture Design: Dual-core neuromorphic lattice with hyper-threaded carbon-silicon photonic pathways and redline trace conduits optimized for predictive cognition and accelerated AI reflexes

Core Processor: InfernaLogic X-2 paired with DeepSynapse Tensor Bridge; capable of bidirectional data exchange across synthetic neural fabrics and high-frequency decision architectures

Memory System: 4D Hypercache Array utilizing ferrofluidic nanomemory and self-organizing logic stacks with adaptive compression at the molecular scale

Power System: FusionPulse microcell reactor augmented by darkwave kinetic harvesters and sub-crystalline capacitors for continuous energy cycling under extreme computational loads

Cooling System: CryoNova circulation network with quantum-phase coolant tunnels and phase-inverted heat sinks capable of operating under supercharged overclock conditions

Connectivity: Dual optical uplink ports with NS-Link v13 adaptive handshake, compatible with NeuroSkin neural relay infrastructure and hybrid biological-implant mesh

Security Framework: Blackseal Quantum Encryption 9.0 with regenerative key rotation; immune to deep-scan intrusion and cognitive feedback corruption

Form Factor: Rectangular low-profile board (47mm x 23mm) with obsidian-black graphene shell and glowing red tracework; gold-plated synaptic pins and titanium heat shielding

Diagnostics & Recovery: Autonomous fault correction via DeepTrace AI agent; includes sublayer redundancy clusters capable of neural-state recovery in 0.03 seconds

Performance Metrics
Parameter	Specification
Neural Throughput	14.2 PetaSynOps/s
Response Latency	0.000018 ms
Power Efficiency	0.003 Joules per teraflop
Thermal Stability	±0.08°C deviation under load
Quantum Integrity	99.9991% coherence across cluster sync
Power Autonomy	596 operational hours (continuous)
Overclock Mode	+340% performance for 120 seconds (regulated)
Integration Notes

Designed for combat-tier AI frameworks, high-frequency prosthetic coordination, and predictive behavioral modeling systems

Fully compatible with NeuroSkin "Eclipse Node," "Cerebra Forge," and Helios Spine platforms

Equipped with CrimsonSync Mode, allowing real-time synchronization across linked NPUs for swarm-based neural computation

Neural overclocking supported through "Vortex Surge" protocol, amplifying computation and reflex loops for emergency response scenarios

Can integrate directly into cortical lattice implants or external AI drone systems via NS-Link overdrive channel

Supports biofeedback-controlled throttling when linked to living neural tissue

Operational Advisory

Excessive use of Vortex Surge Mode may induce temporary data echo or short-term AI aggression response patterns

Unauthorized modification or firmware flashing triggers Redveil Lockdown, permanently encrypting all system access

Requires routine re-calibration every 800,000 computational cycles under Neural Division standards

Must be installed in a shielded chassis or synaptic housing rated for quantum flux isolation

Summary:
The NPU-212 "Crimson Vortex" is the apex of neural aggression and precision — a processor built to think, react, and adapt faster than the human nervous system itself. Designed for those who operate beyond the limits of cognition.`,
    'Model NPU-88 "Cerebra Forge"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Cognitive Systems Division
Model Code: NPU-88-CF
Generation: 8th-Gen Quantum-Hybrid Neural Architecture Platform

Core Features

Architecture Design: Dual-layered photonic-neural hybrid substrate combining graphene-silica microtraces and quantum-memristor cores for ultra-low latency cognition emulation

Core Processor: Tri-Cluster Helion Fusion Array — 48-core synaptic emulation processors paired with a dual-neural tensor accelerator for simultaneous analog and digital computation

Memory Interface: 1.2 TB/s bandwidth via NanoStack v5.0 bus utilizing molecular DRAM cells with self-healing polymeric conduits for data integrity preservation

Power System: Bio-adaptive energy converter supporting both micro-fusion capacitor and neural-current draw from host tissue (for direct brain-mounted integration)

Cooling Mechanism: Cryo-vector microchannel system with phase-shift coolant gel and thermoelectric polarity reversal to maintain 0.2°C equilibrium during overclocked cycles

Connectivity: Dual-channel neuro-I/O bridge compatible with NS-Link, SynCore, and external AI fabric meshes via adaptive quantum handshake encryption

Security: TriaxCipher v6.7 firmware encryption, Blackseal Neural Lockout, and Anti-Echo protocol preventing unauthorized memory mirroring or synaptic replay attacks

Form Factor: Micro-circuit board (42mm x 18mm) encased in matte obsidian-carbon plating with gold-tipped nano-pins; holographic engraving for serial signature authentication

Diagnostics: Self-correcting architecture with onboard biospectral scan for anomaly detection and AI-driven error suppression

Performance Metrics
Parameter	Specification
Neural Compute Throughput	8.4 PetaSynOps/s
Response Latency	0.00003 ms
Thermal Equilibrium Range	0°C — 112°C adaptive threshold
Energy Efficiency	0.004 Joules per teraflop
Cognitive Emulation Fidelity	99.9987% pattern retention accuracy
Power Autonomy	612 operational hours (fusion-cell mode)
Host Integration Sync	0.0000023 deviation across bilateral hemispheric interface
Integration Notes

Designed for synthetic intelligence frameworks, high-frequency neural emulation, and cybernetic cognition reinforcement systems

Fully compatible with NeuroSkin "Helios Spine," "Specter Core," and Argus Orb interfaces

Can function as central co-processor for distributed limbic AIs or as a stand-alone neural emulation node

Features "Cerebra Mode" — a temporary 400% overclock enabling deep cognition, data fusion, and emotional inference under controlled conditions

Includes BioLink tether for hybrid brain–machine synchronization using electrochemical feedback loops

Quantum mesh cores enable instantaneous data convergence across remote neural networks via photonic entanglement

Operational Advisory

Overuse of Cerebra Mode may induce temporary perceptual desync or host neural fatigue

Unauthorized firmware modifications may trigger the Neural Blackout failsafe, permanently disabling the unit

Maintenance required every 1,000 operational hours to recalibrate cooling matrix and entanglement stabilizers

Must be installed in a neuro-shielded chassis to prevent quantum feedback resonance`,
    'Model NPU-99 "Eclipse Node"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Deep Cognition Division
Model Code: NPU-99-EN
Generation: 9th-Gen Quantum Neuromorphic Compute Array

Core Features

Architecture Design: Dual-stack quantum-synapse array built on a carbon-trace graphene substrate with photonic pulse lanes for instantaneous data transfer and zero-loss signal fidelity

Core Processor: Tri-Fusion Neural Matrix — composed of three independent logic clusters operating in parallel: Synaptic Core, Predictive Mesh, and Cognitive Relay, designed for simultaneous sensory interpretation, decision weighting, and long-term data retention

Memory System: 3D NeuroCache v7.4 with molecular phase-change memory and fractal compression algorithms capable of reorganizing memory hierarchies based on active neural patterns

Power System: Dual-state microfusion capacitor bank coupled with thermal energy scavengers and light-reactive nanocells for passive recharging in any environment

Cooling Mechanism: CryoGel flux-layer network circulating between quantum nodes, maintaining equilibrium through adaptive phase transition (-10°C to +90°C tolerance)

Connectivity: Quad-channel neural I/O ports with auto-synchronization via NeuroLink 12.0 protocol; supports bidirectional link to both biological and synthetic nervous systems

Security Framework: Neural Blackseal v5.2 encryption with dynamic key cycling; immune to pattern-based infiltration or cross-signal hijacking

Form Factor: Compact modular microchip (45mm x 22mm x 6mm) encased in matte titanium-black housing with reactive microcircuit veins that illuminate during active cognitive cycles

Diagnostics: Integrated self-corrective algorithms with spectral feedback scanning and thermal-magnetic recalibration per 2 million cycles

Performance Metrics
Parameter	Specification
Neural Throughput	12.8 PetaSynOps/s
Response Latency	0.00002 ms
Quantum Data Efficiency	99.9993% coherence retention
Thermal Stability	±0.1°C deviation under load
Energy Draw	0.006 Joules per teraflop
Power Autonomy	540 operational hours per fusion cycle
Synchronization Accuracy	0.000001 variance across neuro-link pairs
Integration Notes

Designed for neuro-synthetic cognition systems, advanced prosthetic control arrays, and interlinked AI symbiosis frameworks

Fully compatible with NeuroSkin "Cerebra Forge," "Specter Core," "Helios Spine," and Argus Orb units

Can operate in distributed swarm configuration, linking up to 512 NPU-99 units to form an autonomous neural mesh cluster

Features "Eclipse Mode" — a stealth computing function that masks all EM, thermal, and photonic signatures during covert operation cycles

Built-in adaptive redundancy ensures continued operation even after 48% core degradation or physical impairment

Neural pulse regulators synchronize with emotional variance patterns when bonded to organic neural hosts

Operational Advisory

Eclipse Mode exceeding 20 minutes induces neural lag and perceptual desync in hybrid users

Unauthorized firmware modification triggers the Blackseal Cascade, permanently wiping the neural mesh configuration

Requires routine recalibration every 1,000,000 compute cycles for optimal pattern fidelity

Warning: removing the NPU-99 from an active neural link may cause temporary cognitive bleed or memory cross-fade

Summary:
The NPU-99 "Eclipse Node" represents the apex of hybridized cognitive technology — an artifact of engineering that allows thought, instinct, and artificial reasoning to converge into one singular consciousness stream.`,
    'Model DAS-09 "Aegis Weave"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Synthetic Defense Division
Model Code: DAS-09-AW
Generation: 6th-Gen Subdermal Reactive Armor Layer

Core Features

Material Composition: Interwoven tri-alloy mesh composed of titanium-carbide nanofibers, flexible ferrocarbon strands, and adaptive graphene weave — optimized for multi-directional flex and high-tensile resistance

Structural Architecture: Micro-linked "HexLattice" chain design allowing full articulation under mechanical movement without compromising structural rigidity; engineered to distribute kinetic energy across 12,000 micro-points per square inch

Thermal Resistance: Phase-adaptive reactive coating that shifts thermal conductivity under stress — capable of dissipating heat up to 900°C or insulating against cryogenic environments

Impact Mitigation: Dual-phase dampening matrix embedded within fiber channels; automatically stiffens under rapid acceleration, deflecting ballistic and melee trauma through controlled kinetic redirection

Power Integration: Passive nano-inductive system harvesting electrical current from cybernetic limb motion; optional auxiliary connection to the NeuroSkin "Helios Spine" for continuous adaptive monitoring

Camouflage Layering: Matte-reflective surface coating minimizes infrared and radar visibility; optical blending compatible with epidermal overlays for realistic appearance under synthetic skin layers

Maintenance: Self-repairing microfilament network; regenerates up to 87% surface damage through localized nano-welding process within 10 minutes under heat activation

Performance Metrics
Parameter	Specification
Ballistic Resistance	Rated up to 5.7x the standard armor composite (Class IV equivalent)
Thermal Endurance	-80°C to +950°C operational range
Tensile Strength	12.6 GPa
Flexibility Index	98.3% articulation across joint surfaces
Visibility Signature	0.004% EM / IR reflectivity
Auto-Repair Efficiency	87% restoration under 600°C
Weight Density	0.8 kg/m² (lightweight composite)
Integration Notes

Designed for cybernetic limb reinforcement, synthetic skin sublayer installation, or direct dermal augmentation on enhanced human hosts

Fully compatible with NeuroSkin "Eidolon Veil," "Obsidian Reign," and Cerebra Forge systems

Modular installation allows scaling across multiple body zones (arms, torso, cranial plates)

"Aegis Mode" automatically activates during high-impact detection, redistributing force to non-critical mesh nodes

Can synchronize with neural-link feedback systems to regulate limb temperature and detect armor fatigue in real-time

Customizable in Graphite Black, Bloodsteel Red, or Ion Silver finishes

Operational Advisory

Excessive repeated impacts (>3 within 5 seconds) may require recalibration of kinetic dampeners

Overexposure to plasma weaponry may compromise nano-welded junctions

Use of third-party epidermal coatings or adhesives may reduce regenerative efficiency

Routine diagnostic check recommended every 1,000 operational hours

Summary:
The DAS-09 "Aegis Weave" represents the pinnacle of subdermal protection — an invisible fortress beneath the skin. Blending flexibility with military-grade resilience, it ensures operatives can move like flesh and withstand like steel.`,
    'Model DAS-14 "Helix Shroud"': `Technical Specifications

Manufacturer: NeuroSkin Technologies — Subdermal Defense Division
Model Code: DAS-14-HS
Generation: 7th-Gen Adaptive Subdermal Mesh

Core Features

Material Composition: Interwoven tri-metal nano-filaments combining titani-graphene alloy, ferrocarbon microcables, and passivated copper-nickel strands for optimal strength-to-weight ratio and conductive stability.

Lattice Architecture: Multi-scale Helix Weave — concentric micro-helix rows produce anisotropic stiffness (flexible along musculature lines, rigid against perpendicular impacts) and distribute kinetic loads across tens of thousands of micro-nodes.

Adaptive Dampening: Embedded viscoelastic microcells that transition from pliant to semi-rigid under high-strain rates, providing immediate energy redistribution and blunt-force mitigation.

EM/IR Signature Management: Low-glint ceramic coating with embedded metamaterial filaments that reduce IR emissivity and scatter radar/optical interrogation for low detectability under synthetic skin.

Bio-Integration Layer: Bio-neutral adhesive interface with micro-textured anchors for secure lamination beneath epidermal overlays; conductive trace network allows passive telemetry with host systems.

Self-Repair: Nano-weld micro-agents stored in filament reservoirs enable localized repair of micro-fractures (restores surface integrity up to 80% within 12 minutes of activation).

Form Factor: Ultra-thin flexible sheet available in custom cut-patterns to conform to forearm, biceps, thigh, or full arm shells; nominal thickness 0.95–1.6 mm depending on weave density.

Performance Metrics
Parameter	Specification
Kinetic Dissipation	Equivalent to Class IV ballistic mitigation across calibrated strikes
Tensile Strength	13.2 GPa (multi-axial)
Flexibility Index	96% articulation across joint curvature
Weight Density	0.78 kg/m² (standard weave)
Thermal Tolerance	-120°C to +980°C operational range
Electromagnetic Signature	-18 dB reduction vs. bare alloy (IR/EM scatter)
Auto-Repair Efficiency	Restores up to 80% micro-damage within 12 minutes (activation heat / current)
Integration Notes

Designed to be installed between an implant's outer structural shell and the cosmetic epidermal overlay; compatible with NeuroSkin limb housings and modular cranial plates.

Cut-to-shape kits available for forearm (DAS-14-FA), upper arm (DAS-14-UA), thigh (DAS-14-TH) and full arm assemblies (DAS-14-FA+UA).

Passive telemetry lines allow readouts of mesh fatigue and temperature through standard NeuroLink connectors; full integration with Helios Spine for synchronized status feeds.

Cosmetic overlays (synthetic dermis) remain fully compatible; Helix Shroud's low profile preserves natural contours for minimal visible bulk.

Optional coatings: Matte Graphite, Bloodsteel (reddened alloy tint), and Ion Silver (reflective low-glint).

Operational Advisory

Activation of nano-weld repair requires controlled heat/current window; emergency field kits supply a single-use activation cartridge for remote repair.

Repeated high-energy impacts in a short window (>4 within 8 seconds) reduce instantaneous repair efficiency and require maintenance cycle.

Avoid exposure to concentrated plasma discharges or corrosive agents exceeding spec range; prolonged exposure may degrade weave bonding.

Third-party adhesives or unapproved epidermal grafts may interrupt micro-anchor adhesion and void warranty.

Recommended inspection: NeuroSkin certified diagnostics every 600 operational hours (or after any heavy-impact event).

Summary:
The DAS-14 "Helix Shroud" is a stealthy, high-performance subdermal mesh engineered to slip invisibly beneath synthetic epidermis and convert fleshlike form into a durable defensive system. It balances near-armored protection with low visibility and natural articulation — ideal for operatives needing protection without sacrificing appearance or mobility.`
};

// Format price as currency
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

// Load and display products for a category
function loadProducts(categoryId) {
    const category = productCategories[categoryId];
    if (!category) return;
    
    const productList = products[categoryId];
    if (!productList) return;
    
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    for (const product of productList) {
        // Get hardcoded specs
        const specs = productSpecs[product.name] || 'Specifications not available.';
        
        // Encode folder and image paths for URL
        const encodedFolder = encodeURIComponent(category.folder);
        const encodedImage = encodeURIComponent(product.image);
        
        const productCard = document.createElement('div');
        productCard.className = 'product-item-card';
        productCard.innerHTML = `
            <div class="product-item-image">
                <img src="assets/${encodedFolder}/${encodedImage}" alt="${product.name}" onerror="this.style.display='none'; console.error('Failed to load image: assets/${encodedFolder}/${encodedImage}');">
            </div>
            <div class="product-item-info">
                <h3>${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-specs">${specs.replace(/\n/g, '<br>')}</div>
                <button class="btn purchase-btn" data-product="${product.name}" data-price="${product.price}" data-image="${product.image}" data-category="${category.folder}">
                    Purchase
                </button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    }
    
    // Add click handlers for purchase buttons
    document.querySelectorAll('.purchase-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showPurchaseForm(this.dataset.product, this.dataset.price, this.dataset.image, this.dataset.category);
        });
    });
}

// Show purchase form
function showPurchaseForm(productName, price, image, category) {
    const formOverlay = document.getElementById('purchase-form-overlay');
    const formContainer = document.getElementById('purchase-form-container');
    
    if (!formOverlay || !formContainer) return;
    
    // Mobile-friendly input attributes
    const inputAttrs = isMobileDevice ? 'autocomplete="off" inputmode="text"' : '';
    const telAttrs = isMobileDevice ? 'autocomplete="tel" inputmode="tel"' : '';
    const emailAttrs = isMobileDevice ? 'autocomplete="email" inputmode="email"' : '';
    
    const encodedCategory = encodeURIComponent(category);
    const encodedImage = encodeURIComponent(image);
    formContainer.innerHTML = `
        <div class="purchase-product-display">
            <img src="assets/${encodedCategory}/${encodedImage}" alt="${productName}" onerror="this.style.display='none'">
            <h3>${productName}</h3>
            <div class="product-price">${formatPrice(parseFloat(price))}</div>
        </div>
        <form id="purchase-application-form">
            <div class="form-group">
                <label for="purchase-name">Full Name *</label>
                <input type="text" id="purchase-name" name="name" ${inputAttrs} required>
            </div>
            <div class="form-group">
                <label for="purchase-phone">Phone Number *</label>
                <input type="tel" id="purchase-phone" name="phone" ${telAttrs} required>
            </div>
            <div class="form-group">
                <label for="purchase-email">Email Address *</label>
                <input type="email" id="purchase-email" name="email" ${emailAttrs} required>
            </div>
            <div class="form-group">
                <label for="purchase-address">Inspection Address *</label>
                <input type="text" id="purchase-address" name="address" ${inputAttrs} required>
            </div>
            <div class="form-group">
                <label for="purchase-date">Preferred Date of Inspection (Month, Day, Year) *</label>
                <input type="text" id="purchase-date" name="date" placeholder="e.g., January 15, 2024" ${inputAttrs} required>
            </div>
            <div class="form-group">
                <label for="purchase-reason">Reason for Purchase *</label>
                <textarea id="purchase-reason" name="reason" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label for="purchase-medical">Medical History (Optional)</label>
                <textarea id="purchase-medical" name="medical" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label for="purchase-enhancements">Current Enhancements (Optional)</label>
                <textarea id="purchase-enhancements" name="enhancements" rows="3"></textarea>
            </div>
            <button type="submit" class="btn">Submit Purchase Application</button>
        </form>
    `;
    
    formOverlay.classList.add('active');
    
    // Scroll to top of form on mobile
    if (isMobileDevice) {
        setTimeout(function() {
            formOverlay.scrollTop = 0;
        }, 100);
    }
    
    // Handle form submission
    const form = document.getElementById('purchase-application-form');
    if (form) {
        form.addEventListener('submit', handlePurchaseFormSubmit);
    }
}

// Validate date format (Month, Day, Year)
function validateDate(dateString) {
    // Try to parse common date formats
    const datePatterns = [
        /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})$/i,
        /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
        /^(\d{1,2})-(\d{1,2})-(\d{4})$/
    ];
    
    for (const pattern of datePatterns) {
        if (pattern.test(dateString.trim())) {
            return true;
        }
    }
    
    return false;
}

// Handle purchase form submission
function handlePurchaseFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const date = formData.get('date');
    
    // Validate date format
    if (!validateDate(date)) {
        alert('Please enter the date in the format: Month, Day, Year (e.g., January 15, 2024)');
        return;
    }
    
    // Validate required fields
    const requiredFields = ['name', 'phone', 'email', 'address', 'reason'];
    for (const field of requiredFields) {
        if (!formData.get(field) || formData.get(field).trim() === '') {
            alert(`Please fill in the ${field} field.`);
            return;
        }
    }
    
    // Show success overlay
    showPurchaseSuccess();
}

// Show purchase success overlay
function showPurchaseSuccess() {
    const formOverlay = document.getElementById('purchase-form-overlay');
    const successOverlay = document.getElementById('purchase-success-overlay');
    
    if (formOverlay) {
        formOverlay.classList.remove('active');
    }
    
    if (successOverlay) {
        successOverlay.classList.add('active');
        
        // Redirect to products page after 4 seconds
        setTimeout(function() {
            window.location.href = 'products.html';
        }, 4000);
    }
}

// Close purchase form overlay (global function)
window.closePurchaseForm = function() {
    const formOverlay = document.getElementById('purchase-form-overlay');
    if (formOverlay) {
        formOverlay.classList.remove('active');
    }
};

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    // Get category from URL or page ID
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    
    if (productCategories[filename]) {
        loadProducts(filename);
    }
    
    // Close overlay when clicking outside
    const formOverlay = document.getElementById('purchase-form-overlay');
    if (formOverlay) {
        formOverlay.addEventListener('click', function(e) {
            if (e.target === formOverlay) {
                closePurchaseForm();
            }
        });
    }
});

