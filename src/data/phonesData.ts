/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhoneModel } from '../types';

export const PHONES_DATA: PhoneModel[] = [
  {
    id: 'samsung-s26',
    name: 'Samsung Galaxy S26',
    marketingName: 'Galaxy S26 Ultra (5G Flagship)',
    brand: 'Samsung',
    year: 2026,
    tagline: 'Titanium-clad AI powerhouse with 2nm GAA Silicon & 200MP ISOCELL Optics',
    frameColor: '#5c6470',
    backColor: '#1a1f2c',
    accentColor: '#00e5ff',
    screenSize: '6.88" Dynamic AMOLED 2X (144Hz LTPO)',
    weightGrams: 228,
    thicknessMm: 8.2,
    ipRating: 'IP68 (1.5m submersible for 30 min)',
    keySpecs: {
      soc: 'Snapdragon 8 Elite Gen 5 (2nm GAA)',
      processNode: 'TSMC 2nm N2 (Gate-All-Around nanosheets)',
      ram: '16GB LPDDR5X (10.7 Gbps)',
      storage: '1TB UFS 4.1 High-Density 3D V-NAND',
      battery: '5,600 mAh Silicon-Carbon Composite Anode',
      charging: '65W Fast Wired + 25W Qi2 Magnetic Wireless',
      display: 'Dynamic AMOLED 2X, 3500 nits, Gorilla Armor 2',
      mainCamera: '200MP ISOCELL HP3 (1/1.14", f/1.7, OIS)',
      telephotoCamera: '50MP 5x Periscope Folded Prism + 50MP 3x',
      cooling: 'Super-Vapor Chamber (12,400mm² sintered copper)',
      materials: 'Grade 5 Titanium, Sapphire Crystal, Ceramic Glass'
    },
    sustainabilityScore: 89,
    recycledMaterialsPercent: 42,
    components: [
      {
        id: 's26-display',
        name: 'Display Panel & Digitizer',
        codeName: 'M15 LTPO Dynamic AMOLED 2X',
        category: 'display',
        layerZ: -2.8,
        layerGroup: 'display',
        functionSummary: 'Ultra-thin, variable-refresh emissive OLED layer with an integrated touch sensor grid and anti-reflective nanocoating.',
        detailedArchitecture: 'Constructed from a multi-layer stack: flexible polyimide substrate, an array of organic light-emitting subpixels arranged in a Diamond PenTile grid, an ultra-fast on-cell capacitive digitizer yielding 480Hz touch polling, and Corning Gorilla Armor 2 anti-glare cover glass.',
        materials: [
          { name: 'Corning Gorilla Armor 2 Glass', chemicalSymbol: 'Al2O3-SiO2', percentage: '65%', purpose: 'Scratch-resistant cover with 75% reduced glare', colorHex: '#60a5fa' },
          { name: 'Indium Tin Oxide (ITO)', chemicalSymbol: 'In2O3-SnO2', percentage: '12%', purpose: 'Transparent conductive grid for 480Hz touch input', colorHex: '#38bdf8' },
          { name: 'Organic Phosphorescent Emissive Dyes', chemicalSymbol: 'Ir(ppy)3', percentage: '8%', purpose: 'Red, green, and blue sub-pixel light emission', colorHex: '#4ade80' },
          { name: 'Polyimide Plastic Substrate', chemicalSymbol: '(C22H10N2O5)n', percentage: '15%', purpose: 'Flexible, heat-resistant foundational base plate', colorHex: '#fbbf24' }
        ],
        specs: {
          'Resolution': '3120 x 1440 QHD+ (505 ppi)',
          'Peak Brightness': '3,500 nits HDR',
          'Refresh Rate': '1Hz - 144Hz Variable LTPO 4.0',
          'Touch Sampling': '480Hz with stylus digitizer support',
          'PWM Dimming': '2,160Hz High-Frequency Flicker-Free'
        },
        keyInnovations: [
          'Sub-surface antireflective nano-ion infusion reducing reflection to <1%',
          'Low-power LTPO 4.0 backplane with oxide thin-film transistors',
          'Under-display camera transmission waveguide zone'
        ],
        meshType: 'display_panel',
        position: [0, 0, -0.22],
        dimensions: [3.4, 7.2, 0.05],
        colorHex: '#080c14',
        roughness: 0.1,
        metalness: 0.2,
        opacity: 0.95,
        highlightColor: '#00e5ff'
      },
      {
        id: 's26-chassis',
        name: 'Chassis Frame & Midplate',
        codeName: 'Grade 5 Ti-Aerospace Alloy Core',
        category: 'chassis',
        layerZ: -1.6,
        layerGroup: 'chassis',
        functionSummary: 'The structural skeleton that dissipates impact forces, anchors internal sub-assemblies, and integrates 5G RF antennas.',
        detailedArchitecture: 'Hybrid structural unibody engineered via solid-state diffusion bonding: Grade 5 Titanium exterior frame (Ti-6Al-4V) for high tensile strength, CNC-milled 7075 aircraft aluminum midplate for thermal routing, and overmolded plastic antenna isolator seams.',
        materials: [
          { name: 'Grade 5 Titanium (Ti-6Al-4V)', chemicalSymbol: 'Ti90-Al6-V4', percentage: '48%', purpose: 'High strength-to-weight outer structural perimeter', rarity: 'critical', colorHex: '#94a3b8' },
          { name: '7075-T6 Aerospace Aluminum', chemicalSymbol: 'Al-Zn-Mg-Cu', percentage: '38%', purpose: 'Internal heat-spreading midplate & mounting tabs', colorHex: '#cbd5e1' },
          { name: 'Polyetheretherketone (PEEK)', chemicalSymbol: '(C19H12O3)n', percentage: '9%', purpose: 'Antenna break RF insulation & dielectric gasket', colorHex: '#f59e0b' },
          { name: 'Stainless Steel Inserts (316L)', chemicalSymbol: 'Fe-Cr-Ni-Mo', percentage: '5%', purpose: 'Threaded micro-screw mounts with anti-stripping', colorHex: '#e2e8f0' }
        ],
        specs: {
          'Tensile Strength': '950 MPa (Titanium Outer Rails)',
          'Torsional Rigidity': '34,000 N·m/deg',
          'Machining Precision': '±0.005mm 5-axis CNC micro-milled',
          'Antenna Splits': '6 nano-molded RF transmission channels'
        },
        keyInnovations: [
          'Vapor-phase PVD deposition coating for fingerprint and scratch resistance',
          'Direct-weld ultrasonic mounting bosses for motherboard and haptics',
          'Integrated acoustic sound-pipe chamber for bottom-firing loudspeaker'
        ],
        meshType: 'chassis_frame',
        position: [0, 0, -0.05],
        dimensions: [3.5, 7.3, 0.28],
        colorHex: '#475569',
        roughness: 0.35,
        metalness: 0.85,
        highlightColor: '#38bdf8'
      },
      {
        id: 's26-vapor-chamber',
        name: 'Cooling System (Vapor Chamber & Graphite)',
        codeName: 'Cryo-Dual 3D Vapor Chamber V4',
        category: 'cooling',
        layerZ: -0.8,
        layerGroup: 'cooling',
        functionSummary: 'Two-phase thermal dissipation apparatus transferring heat away from the SoC and 5G modem across a 12,400mm² expanse.',
        detailedArchitecture: 'Hermetically sealed 0.35mm vacuum chamber fabricated from oxygen-free electrolytic copper (OFHC). Internal capillary structure contains micro-sintered copper powder wicks with microscopic channels. Deionized water inside evaporates at the hot junction and condenses at the cold edge.',
        materials: [
          { name: 'Oxygen-Free High Conductivity Copper', chemicalSymbol: 'Cu (99.99%)', percentage: '72%', purpose: 'Chamber walls and micro-sintered capillary wick', rarity: 'critical', colorHex: '#b45309' },
          { name: 'Multi-layer Pyrolytic Graphite Sheet', chemicalSymbol: 'C (Hexagonal)', percentage: '20%', purpose: 'Planar heat distribution over battery and screen', colorHex: '#334155' },
          { name: 'Deionized Ultra-Pure Water', chemicalSymbol: 'H2O', percentage: '4%', purpose: 'Two-phase phase-change working fluid (vacuum sealed)', colorHex: '#67e8f9' },
          { name: 'Phase Change Thermal Interface (TIM)', chemicalSymbol: 'In-Ga Liquid Metal/Gel', percentage: '4%', purpose: 'Direct contact bridging SoC die to vapor chamber', rarity: 'critical', colorHex: '#a855f7' }
        ],
        specs: {
          'Surface Area': '12,400 mm² (1.8x larger than S24)',
          'Thermal Conductivity': 'Up to 5,000 W/m·K (effective)',
          'Wick Structure': 'Dual-layer laser-sintered copper micro-spheres (15µm pore size)',
          'Operating Pressure': '0.04 bar (vacuum sealed for 32°C boiling)'
        },
        keyInnovations: [
          'Direct-die vapor chamber mounting eliminating conventional silicone pads',
          '3D contoured drop-step allowing clearance for camera actuators',
          'Sintered copper mesh with capillary force supporting inverted phone orientations'
        ],
        meshType: 'vapor_chamber',
        position: [0.1, 0.4, 0.05],
        dimensions: [2.6, 4.4, 0.06],
        colorHex: '#c2410c',
        roughness: 0.3,
        metalness: 0.9,
        highlightColor: '#f97316'
      },
      {
        id: 's26-soc',
        name: 'Processor / SoC',
        codeName: 'Snapdragon 8 Elite Gen 5 Extreme Silicon',
        category: 'processor',
        layerZ: 0.0,
        layerGroup: 'chips',
        functionSummary: 'The primary computational brain, executing billions of AI inferences, graphics shaders, and OS instructions per second.',
        detailedArchitecture: 'Monolithic system-on-chip manufactured on TSMC 2nm GAA (Gate-All-Around) architecture with Oryon V3 CPU cores (2x Prime @ 4.6GHz, 6x Performance @ 3.6GHz), Adreno 850 Ray Tracing GPU, and Hexagon NPU producing 110 TOPS on-device AI throughput.',
        materials: [
          { name: 'Hyper-Pure Crystalline Silicon (2nm GAA)', chemicalSymbol: 'Si (99.9999999%)', percentage: '45%', purpose: 'Semiconductor substrate with 28 billion transistors', rarity: 'critical', colorHex: '#475569' },
          { name: 'Copper Dual-Damascene Interconnects', chemicalSymbol: 'Cu', percentage: '26%', purpose: '18 layers of microscopic electrical routing wires', colorHex: '#ea580c' },
          { name: 'Ruthenium & Cobalt Contacts', chemicalSymbol: 'Ru / Co', percentage: '12%', purpose: 'Low-resistance barrier liners for sub-10nm gate contacts', rarity: 'rare_earth', colorHex: '#cbd5e1' },
          { name: 'Gold-Palladium Ball Grid Array (BGA)', chemicalSymbol: 'Au-Pd', percentage: '8%', purpose: '2,400 micro-bumps interfacing chip package to PCB', rarity: 'precious', colorHex: '#facc15' },
          { name: 'Epoxy Mold Compound (EMC)', chemicalSymbol: 'Silica-Epoxy', percentage: '9%', purpose: 'Protective hermetic packaging against moisture and shock', colorHex: '#1e293b' }
        ],
        specs: {
          'Fabrication Node': 'TSMC 2nm N2 Gate-All-Around Nanosheet',
          'Transistor Count': '28.4 Billion transistors',
          'CPU Cluster': '2x Oryon V3 @ 4.62 GHz + 6x @ 3.65 GHz',
          'NPU Power': '110 TOPS Int4 / 58 TFLOPS FP16 (Neural Engine)',
          'GPU Architecture': 'Adreno 850 with hardware Mesh Shaders & BVH RT'
        },
        keyInnovations: [
          'Full Gate-All-Around nanosheets cutting leakage current by 34%',
          'Package-on-Package (PoP) stacking directly beneath LPDDR5X RAM',
          'Dedicated Hardware Enclave 3.0 for zero-trust cryptographic biometrics'
        ],
        meshType: 'soc',
        position: [-0.35, 1.35, 0.16],
        dimensions: [1.1, 1.1, 0.08],
        colorHex: '#0f172a',
        roughness: 0.2,
        metalness: 0.8,
        highlightColor: '#00f0ff'
      },
      {
        id: 's26-modem',
        name: '5G Modem & RF Transceiver Chip',
        codeName: 'Qualcomm Snapdragon X85 5G RF System',
        category: 'connectivity',
        layerZ: 0.3,
        layerGroup: 'chips',
        functionSummary: 'Processes ultra-high-frequency radio signals, mmWave beamforming, and satellite messaging with gigabit speeds.',
        detailedArchitecture: 'Dedicated communication baseband paired with the SDR875 RF transceiver. Utilizes an integrated Tensor-accelerated AI Coprocessor to dynamically tune antenna impedance and phase arrays in real-time, delivering up to 12 Gbps theoretical downlink over 8x Sub-6GHz carrier aggregation.',
        materials: [
          { name: 'Silicon-Germanium (SiGe) BiCMOS', chemicalSymbol: 'SiGe', percentage: '38%', purpose: 'High-frequency low-noise RF amplifier stages', rarity: 'critical', colorHex: '#64748b' },
          { name: 'Gallium Arsenide (GaAs)', chemicalSymbol: 'GaAs', percentage: '22%', purpose: 'Power amplifier modules (PAM) for high-efficiency RF', rarity: 'critical', colorHex: '#e2e8f0' },
          { name: 'Gold Wire Bonds (25µm)', chemicalSymbol: 'Au (99.99%)', percentage: '14%', purpose: 'Micro-welded connections to external antenna lines', rarity: 'precious', colorHex: '#fbbf24' },
          { name: 'Ceramic Low-Temperature Co-Fired (LTCC)', chemicalSymbol: 'Al2O3-SiO2', percentage: '26%', purpose: 'Substrate filters for mmWave 28GHz / 39GHz isolation', colorHex: '#f1f5f9' }
        ],
        specs: {
          'Peak Downlink': '12.0 Gbps (Sub-6 + mmWave Aggregated)',
          'Peak Uplink': '3.8 Gbps with 4x MIMO UL',
          'Antenna Integration': 'Supports 8Rx simultaneous diversity beams',
          'Satellite Protocol': '3GPP Release 18 NTN (Non-Terrestrial Network)',
          'Power Efficiency': '30% lower power via AI Sleep-State prediction'
        },
        keyInnovations: [
          'Smart Transmit 4.0 AI algorithm optimizing radiated power per millisecond',
          'Direct satellite two-way high-bandwidth voice & emergency broadband',
          'Micro-molded RF shield integrating phase-shifters directly into substrate'
        ],
        meshType: 'modem',
        position: [0.65, 1.45, 0.16],
        dimensions: [0.85, 0.85, 0.07],
        colorHex: '#1e1b4b',
        roughness: 0.3,
        metalness: 0.7,
        highlightColor: '#818cf8'
      },
      {
        id: 's26-motherboard',
        name: 'Main Logic Board / Motherboard',
        codeName: '14-Layer Stacked Micro-HDI PCB',
        category: 'motherboard',
        layerZ: 0.6,
        layerGroup: 'motherboard',
        functionSummary: 'The nerve center connecting every processor, sensor, camera ribbon, and antenna across the device.',
        detailedArchitecture: 'Multi-layer High-Density Interconnect (HDI) rigid-flex printed circuit board. Uses laser-drilled stacked micro-vias (35µm diameter) across 14 layers of copper and low-loss FR-4 dielectric substrate, topped with copper-nickel Faraday shields to prevent electromagnetic crosstalk.',
        materials: [
          { name: 'Electrolytic Copper Foil Cladding', chemicalSymbol: 'Cu', percentage: '44%', purpose: 'Signal traces and continuous ground heat-planes', colorHex: '#d97706' },
          { name: 'FR-4 High-Tg Glass Epoxy', chemicalSymbol: 'Epoxy-Fiberglass', percentage: '32%', purpose: 'Rigid insulating dielectric laminate core', colorHex: '#15803d' },
          { name: 'Electroless Nickel Immersion Gold (ENIG)', chemicalSymbol: 'Ni-Au', percentage: '9%', purpose: 'Corrosion-proof contact pads for SMD soldering', rarity: 'precious', colorHex: '#eab308' },
          { name: 'Stainless Steel / Copper EMI Shield Cans', chemicalSymbol: 'Ni-Cu-Fe', percentage: '15%', purpose: 'Faraday cages shielding radio frequencies from SoC', colorHex: '#94a3b8' }
        ],
        specs: {
          'Layer Count': '14 Stacked HDI Layers with staggered microvias',
          'Trace Width / Space': '18µm / 18µm ultra-fine line pitch',
          'Passives Mounted': 'Over 2,100 micro-resistors and 01005 MLCC capacitors',
          'Board Thickness': '0.72mm total thickness with dual-sided SMT'
        },
        keyInnovations: [
          'Buried thermal vias conducting SoC heat straight to the vapor chamber',
          'Interposer ring isolating analog RF transceivers from digital memory lanes',
          'Conformal parylene coating rendering circuits resistant to condensation'
        ],
        meshType: 'motherboard',
        position: [0.1, 1.25, 0.12],
        dimensions: [2.8, 3.2, 0.1],
        colorHex: '#064e3b',
        roughness: 0.4,
        metalness: 0.4,
        highlightColor: '#10b981'
      },
      {
        id: 's26-memory',
        name: 'RAM & Flash Storage Chips',
        codeName: '16GB LPDDR5X + 1TB UFS 4.1 V-NAND',
        category: 'memory',
        layerZ: 0.9,
        layerGroup: 'chips',
        functionSummary: 'Ultra-low-latency operating memory paired with non-volatile multi-terabyte solid-state flash storage.',
        detailedArchitecture: 'Package-on-Package (PoP) stacked directly atop the processor for the 16GB LPDDR5X RAM (operating at 10.7 Gbps), and an adjacent 1TB UFS 4.1 package composed of 8 stacked 3D V-NAND dies with 236 layers of charge-trap cells linked via through-silicon vias (TSVs).',
        materials: [
          { name: 'High-Purity Silicon with Charge-Trap Nitride', chemicalSymbol: 'Si / Si3N4', percentage: '52%', purpose: 'Non-volatile flash cells and high-speed DRAM capacitors', colorHex: '#475569' },
          { name: 'Through-Silicon Vias (Copper TSVs)', chemicalSymbol: 'Cu', percentage: '24%', purpose: 'Vertical electrical conduits penetrating stacked NAND dies', colorHex: '#f97316' },
          { name: 'Gold / Tin-Silver Solder Micro-Balls', chemicalSymbol: 'Sn-Ag-Cu / Au', percentage: '12%', purpose: 'Inter-die interconnects with ultra-tight 50µm pitch', rarity: 'precious', colorHex: '#facc15' },
          { name: 'Polyimide Dielectric Insulation', chemicalSymbol: 'PI', percentage: '12%', purpose: 'Dielectric passivation layer between stacked silicon dies', colorHex: '#fbbf24' }
        ],
        specs: {
          'DRAM Bandwidth': '85.6 GB/s data transfer rate',
          'Storage Sequential Read': '4,400 MB/s (UFS 4.1 Dual-Lane)',
          'Storage Sequential Write': '3,800 MB/s',
          'NAND Architecture': '236-Layer 8th Gen 3D V-NAND Stack'
        },
        keyInnovations: [
          'High-K Metal Gate dielectric reducing standby DRAM leakage by 25%',
          'Low-voltage High-Speed Link (LV-HS) operating down to 0.5V',
          'Advanced Wear-Leveling Algorithm extending flash endurance to 1,500 TBW'
        ],
        meshType: 'memory_chips',
        position: [-0.35, 1.35, 0.23],
        dimensions: [1.1, 1.1, 0.05],
        colorHex: '#18181b',
        roughness: 0.3,
        metalness: 0.6,
        highlightColor: '#a855f7'
      },
      {
        id: 's26-battery',
        name: 'Battery (Silicon-Carbon Anode)',
        codeName: '5,600 mAh High-Density Si-C Pack',
        category: 'battery',
        layerZ: 1.3,
        layerGroup: 'battery',
        functionSummary: 'High-capacity chemical energy reservoir with next-generation silicon-carbon anode boosting volumetric energy density to 900 Wh/L.',
        detailedArchitecture: 'Pouch cell with stacked electrode foils: Nickel-Manganese-Cobalt (NMC 811) cathode, Silicon-embedded Porous Carbon anode (storing 10x more lithium ions than conventional graphite), non-flammable solid-gel electrolyte, and an aluminum composite pouch with laser-welded nickel tabs.',
        materials: [
          { name: 'Silicon-Carbon Nanotube Composite Anode', chemicalSymbol: 'Si-C (MWCNT)', percentage: '26%', purpose: 'Anode host storing lithium ions with high density', rarity: 'critical', colorHex: '#1e293b' },
          { name: 'Lithium Nickel Manganese Cobalt Oxide', chemicalSymbol: 'LiNi0.8Mn0.1Co0.1O2', percentage: '38%', purpose: 'Cathode material supplying high redox voltage (4.45V)', rarity: 'critical', colorHex: '#475569' },
          { name: 'Lithium Hexafluorophosphate (LiPF6)', chemicalSymbol: 'LiPF6 in EC/DMC', percentage: '14%', purpose: 'Conductive electrolyte salts facilitating ionic migration', rarity: 'critical', colorHex: '#93c5fd' },
          { name: 'Ultra-thin Copper & Aluminum Current Foils', chemicalSymbol: 'Cu (6µm) / Al (10µm)', percentage: '12%', purpose: 'Substrates collecting electrical charge at electrodes', colorHex: '#f59e0b' },
          { name: 'Ceramic-Coated Polyethylene Separator', chemicalSymbol: 'PE-Al2O3', percentage: '10%', purpose: 'Thermal shutdown barrier preventing electrical shorts', colorHex: '#f8fafc' }
        ],
        specs: {
          'Nominal Capacity': '5,600 mAh (21.6 Wh)',
          'Energy Density': '910 Wh/L Volumetric / 340 Wh/kg Gravimetric',
          'Nominal Voltage': '3.86V (Peak 4.45V charge cutoff)',
          'Cycle Life': '1,600 full charge cycles to 80% original capacity',
          'Fast Charging': '65W Super Fast Charging 2.0 (0-70% in 22 mins)'
        },
        keyInnovations: [
          'Silicon nanospheres in carbon cages absorbing 300% silicon volume expansion',
          'Self-healing polymer binder preventing micro-cracking across rapid discharge',
          'Pull-tab stretch-release adhesive facilitating ethical battery repair and recycling'
        ],
        meshType: 'battery',
        position: [0.1, -1.2, 0.12],
        dimensions: [2.7, 3.8, 0.16],
        colorHex: '#111827',
        roughness: 0.4,
        metalness: 0.3,
        highlightColor: '#22c55e'
      },
      {
        id: 's26-cameras',
        name: 'Quad-Camera Array & Periscope OIS',
        codeName: '200MP ISOCELL HP3 + 50MP 5x Folded Periscope',
        category: 'camera',
        layerZ: 1.8,
        layerGroup: 'cameras',
        functionSummary: 'Modular optical cluster featuring wide-angle 200MP main camera, 5x folded periscope telephoto, 3x portrait telephoto, and ultra-wide sensor.',
        detailedArchitecture: 'Main module features a 1/1.14-inch ISOCELL sensor with 0.56µm pixels and 16-in-1 pixel binning, suspended inside an SMA (Shape Memory Alloy) voice-coil motor for 3-axis optical image stabilization. The 5x periscope uses a total internal reflection prism with ball-bearing servo drive.',
        materials: [
          { name: 'Sapphire Crystal Lens Covers', chemicalSymbol: 'Al2O3 (Corundum)', percentage: '28%', purpose: 'Mohs 9 hardness scratch-resistant outer lens elements', rarity: 'precious', colorHex: '#38bdf8' },
          { name: 'Neodymium Iron Boron (NdFeB) Magnets', chemicalSymbol: 'Nd2Fe14B', percentage: '18%', purpose: 'Generates intense magnetic fields for voice-coil AF/OIS', rarity: 'rare_earth', colorHex: '#64748b' },
          { name: 'Optical Grade Glass & Cyclo-Olefin Polymers', chemicalSymbol: 'COP (Zeonex)', percentage: '26%', purpose: '8P precision aspheric lens stack minimizing chromatic flare', colorHex: '#e0f2fe' },
          { name: 'Copper Voice Coils & SMA Actuators', chemicalSymbol: 'Cu / Nitinol (NiTi)', percentage: '16%', purpose: 'Electromagnetic coils driving sub-micron lens focus', colorHex: '#d97706' },
          { name: 'Silicon CMOS Sensor Dies with DTI', chemicalSymbol: 'Si with SiO2 Trench', percentage: '12%', purpose: 'Deep Trench Isolation pixel arrays trapping photons', colorHex: '#334155' }
        ],
        specs: {
          'Main Sensor': '200MP (1/1.14" format, f/1.7, 24mm equivalent)',
          'Periscope Telephoto': '50MP 5x optical zoom (f/3.4, 115mm, folded prism)',
          '3x Portrait Tele': '50MP 3x optical zoom (f/2.4, 70mm, dual pixel PDAF)',
          'Ultra-Wide': '50MP (120° FOV, f/2.2 with 1.4cm macro focus)',
          'OIS Angle Compensation': '±3.2 degrees dynamic angular stabilization'
        },
        keyInnovations: [
          'Folded periscope optical train bouncing photons 90 degrees horizontally',
          'Tetra-prism dual-reflection prism coated with atomic layer dielectric mirrors',
          'Voice-coil motor with zero-backlash ceramic ball-bearing guide rails'
        ],
        meshType: 'camera_module',
        position: [-0.78, 1.8, 0.25],
        dimensions: [1.6, 2.7, 0.28],
        colorHex: '#090d16',
        roughness: 0.15,
        metalness: 0.9,
        highlightColor: '#f43f5e'
      },
      {
        id: 's26-sensors',
        name: 'Sensor Cluster & Ultrasonic Biometrics',
        codeName: 'SonicMax 3D + 6-Axis IMU & ToF Radar',
        category: 'sensors',
        layerZ: 2.1,
        layerGroup: 'chips',
        functionSummary: 'Micromechanical MEMS and acoustic transducers sensing spatial acceleration, barometric altitude, and fingerprint friction ridges.',
        detailedArchitecture: '3D Ultrasonic Fingerprint sensor using piezoelectric PVDF elements generating 20MHz ultrasonic sound pulses to scan 3D dermal ridges beneath glass; 6-Axis Bosch MEMS IMU with suspended silicon comb drives; and multi-spectral ambient light color sensor.',
        materials: [
          { name: 'Polyvinylidene Fluoride (PVDF)', chemicalSymbol: '-(C2H2F2)n-', percentage: '35%', purpose: 'Piezoelectric transducer converting electricity to sound waves', colorHex: '#a5b4fc' },
          { name: 'Etched Polysilicon MEMS Comb Drives', chemicalSymbol: 'Poly-Si', percentage: '30%', purpose: 'Suspended micro-masses deflecting under acceleration', colorHex: '#64748b' },
          { name: 'Gallium Nitride (GaN) / Silicon Photodiodes', chemicalSymbol: 'GaN / Si', percentage: '20%', purpose: 'Infrared & visible spectrum ambient light detection', colorHex: '#f472b6' },
          { name: 'Gold Electrodes & Trace Contacts', chemicalSymbol: 'Au', percentage: '15%', purpose: 'High-frequency acoustic impedance matching layers', rarity: 'precious', colorHex: '#fbbf24' }
        ],
        specs: {
          'Biometric Scanning Area': '20mm x 30mm (reads two fingers simultaneously)',
          'Acoustic Wave Frequency': '20 MHz ultrasound pulse',
          'IMU Gyroscope Sensitivity': '131 LSB/(°/s) with 0.005°/s noise floor',
          'Barometric Altimeter': 'Detects elevation changes down to 5 cm'
        },
        keyInnovations: [
          'Sub-surface acoustic impedance mapping penetration through wet/oily skin',
          'On-die machine learning sensor hub consuming under 1.2mW in standby',
          'Real-time flicker detection adjusting camera shutter to fluorescent lighting'
        ],
        meshType: 'sensors_cluster',
        position: [0.0, -0.6, 0.18],
        dimensions: [1.4, 1.8, 0.05],
        colorHex: '#1e293b',
        roughness: 0.3,
        metalness: 0.5,
        highlightColor: '#ec4899'
      },
      {
        id: 's26-audio-haptics',
        name: 'Acoustic Speakers & Haptic Linear Motor',
        codeName: 'Dual Stereo N52SH Driver + X-Axis Haptic Actuator',
        category: 'audio_haptics',
        layerZ: 2.4,
        layerGroup: 'chassis',
        functionSummary: 'High-fidelity stereo acoustic transducer paired with an ultra-responsive resonant linear haptic vibration actuator.',
        detailedArchitecture: 'Dual stereo speaker drivers with tuned 1.2cc acoustic back cavities packed with micro-porous zeolite balls (virtually expanding perceived cavity size to 1.8cc). The haptic motor uses a suspended tungsten inertial mass held by leaf springs, driven by N52SH neodymium magnets.',
        materials: [
          { name: 'High-Coercivity Neodymium Magnets (N52SH)', chemicalSymbol: 'Nd2Fe14B (Dy-doped)', percentage: '42%', purpose: 'Generates intense magnetic flux inside speaker and haptics', rarity: 'rare_earth', colorHex: '#475569' },
          { name: 'High-Density Tungsten Alloy (W-Ni-Fe)', chemicalSymbol: 'W (95%)', percentage: '28%', purpose: 'Heavy inertial moving mass for sharp, instantaneous clicks', rarity: 'critical', colorHex: '#94a3b8' },
          { name: 'Beryllium-Copper Alloy Leaf Springs', chemicalSymbol: 'BeCu', percentage: '12%', purpose: 'Fatigue-resistant flexure suspension arms', colorHex: '#d97706' },
          { name: 'Silicone / PEEK Composite Diaphragm', chemicalSymbol: 'LSR-PEEK', percentage: '10%', purpose: 'Acoustic speaker cone flexing with minimal distortion', colorHex: '#cbd5e1' },
          { name: 'Zeolite Synthetic Micro-Balls', chemicalSymbol: 'Na-Al-Silicate', percentage: '8%', purpose: 'Acoustic bass absorption granules expanding bass chamber', colorHex: '#e2e8f0' }
        ],
        specs: {
          'Haptic Rise Time': '< 5 milliseconds to peak acceleration',
          'Haptic Peak G-Force': '1.8 G acceleration',
          'Acoustic SPL': '86 dB @ 1 meter with Dolby Atmos Spatial EQ',
          'Voice Coil Impedance': '8 Ohms with smart class-D boost amplifier'
        },
        keyInnovations: [
          'Zeolite acoustic dampening lowering resonant bass cutoff to 350Hz',
          'Sub-cycle brake pulse algorithm eliminating unwanted residual vibration',
          'Dual acoustic ports channeled through CNC laser-perforated frame grilles'
        ],
        meshType: 'audio_taptic',
        position: [0.0, -3.1, 0.15],
        dimensions: [2.6, 0.7, 0.12],
        colorHex: '#334155',
        roughness: 0.35,
        metalness: 0.8,
        highlightColor: '#eab308'
      },
      {
        id: 's26-back-glass',
        name: 'Rear Ceramic Glass & Camera Deco Ring',
        codeName: 'Corning Gorilla Glass Victus 3 + PVD Ceramic Rings',
        category: 'chassis',
        layerZ: 2.8,
        layerGroup: 'back',
        functionSummary: 'The exterior back shell providing environmental hermetic seal, matte tactile finish, and Qi2 wireless induction window.',
        detailedArchitecture: 'Chemically strengthened alkali-aluminosilicate glass panel with acid-etched anti-glare satin surface. Features an integrated ferrite-shielded inductive copper coil for 25W Qi2 magnetic wireless charging and NFC antenna traces.',
        materials: [
          { name: 'Corning Victus 3 Ceramic Glass', chemicalSymbol: 'SiO2-Al2O3-Na2O', percentage: '68%', purpose: 'Shatter-resistant back shell with satin acid-etch texture', colorHex: '#475569' },
          { name: 'Multi-strand Litz Copper Wire Coil', chemicalSymbol: 'Cu (99.99%)', percentage: '16%', purpose: 'Qi2 wireless charging induction transmitting 25W', colorHex: '#ea580c' },
          { name: 'Sintered Ferrite Magnetic Shield', chemicalSymbol: 'NiZn Ferrite', percentage: '8%', purpose: 'Shields internal circuits from high-frequency wireless EMI', colorHex: '#1e293b' },
          { name: 'Physical Vapor Deposition (PVD) Titanium Color', chemicalSymbol: 'TiN / TiCN', percentage: '8%', purpose: 'Sputtered metallic color coating on underside of glass', colorHex: '#00e5ff' }
        ],
        specs: {
          'Drop Resistance': 'Survives 2.2m drops onto rough concrete surfaces',
          'Induction Efficiency': '86% electrical transfer efficiency to Qi2 pad',
          'Surface Finish': 'Matte AG Silk Texture (Ra = 0.4µm)',
          'NFC Range': '4.5cm polling distance with active secure element'
        },
        keyInnovations: [
          'Acid-etched nano-micro texture resisting oily skin prints without silicone spray',
          'Embedded ring of 18 calibrated neodymium magnets for Qi2 magnetic alignment',
          'Ultra-thin 0.55mm edge profile with CNC-beveled 2.5D perimeter'
        ],
        meshType: 'back_glass',
        position: [0, 0, 0.32],
        dimensions: [3.4, 7.2, 0.06],
        colorHex: '#1e293b',
        roughness: 0.25,
        metalness: 0.4,
        opacity: 0.88,
        highlightColor: '#00e5ff'
      }
    ]
  },
  {
    id: 'apple-iphone18',
    name: 'Apple iPhone 18',
    marketingName: 'iPhone 18 Pro Max (Titanium Unibody)',
    brand: 'Apple',
    year: 2026,
    tagline: 'TSMC 2nm A20 Pro Bionic, Tetraprism 3D Optical Matrix, and Custom Apple C2 5G Silicon',
    frameColor: '#434343',
    backColor: '#1c1c1e',
    accentColor: '#fb923c',
    screenSize: '6.9" Super Retina XDR Tandem OLED (ProMotion)',
    weightGrams: 221,
    thicknessMm: 8.1,
    ipRating: 'IP68 (6m submersible for 30 min)',
    keySpecs: {
      soc: 'Apple A20 Pro Bionic (2nm TSMC N2P)',
      processNode: '2nm TSMC N2P Enhanced GAA Architecture',
      ram: '16GB Unified LPDDR5T (High-Bandwidth)',
      storage: '1TB Custom NVMe with Hardware Encryption',
      battery: '4,950 mAh L-Shaped Silicon-Anode Stainless Pack',
      charging: '45W MagSafe 2.0 Magnetic Wireless + USB-C 40Gbps',
      display: 'Tandem OLED Micro-Lens Array, 3,200 nits',
      mainCamera: '48MP Fusion (Sensor-Shift OIS 3.0, f/1.6, 24mm)',
      telephotoCamera: '48MP Tetraprism 5x Telephoto with 3D Shift',
      cooling: 'Direct-Diffusion Titanium Subframe + Graphene',
      materials: 'Grade 5 Titanium, 100% Recycled Aluminum Substructure'
    },
    sustainabilityScore: 94,
    recycledMaterialsPercent: 55,
    components: [
      {
        id: 'ip18-display',
        name: 'Display Panel & Digitizer',
        codeName: 'Tandem OLED Super Retina XDR with MLA',
        category: 'display',
        layerZ: -2.8,
        layerGroup: 'display',
        functionSummary: 'Two stacked OLED emission layers delivering incredible 3,200 nit peak brightness and ultra-low power consumption.',
        detailedArchitecture: 'Tandem OLED architecture with two series-connected RGB organic emission layers, Micro-Lens Array (MLA) redirecting scattered light forward, Ceramic Shield 3 nanocrystal matrix, and capacitive touch digitizer reading through 120Hz ProMotion.',
        materials: [
          { name: 'Ceramic Shield 3 Nano-Crystals', chemicalSymbol: 'Nano-Glass Ceramic', percentage: '60%', purpose: 'Embedded micro-crystals resisting drops 4x better than glass', colorHex: '#cbd5e1' },
          { name: 'Tandem Organic Light Dyes (Dual Layer)', chemicalSymbol: 'OLED Organics', percentage: '12%', purpose: 'Stacked red, green, blue emitting molecules in series', colorHex: '#38bdf8' },
          { name: 'Micro-Lens Array Silica Beads', chemicalSymbol: 'SiO2 Beads', percentage: '10%', purpose: 'Millions of microscopic lenses focusing light straight out', colorHex: '#93c5fd' },
          { name: 'Low-Temperature Polycrystalline Oxide', chemicalSymbol: 'LTPO TFT', percentage: '18%', purpose: 'Energy-saving transistor backplane modulating 1-120Hz', colorHex: '#fbbf24' }
        ],
        specs: {
          'Resolution': '2868 x 1320 (460 ppi)',
          'Peak Outdoor Brightness': '3,200 nits HDR peak / 1,600 nits SDR',
          'Contrast Ratio': '2,000,000:1 True Black',
          'Refresh Rate': 'ProMotion 1Hz to 120Hz Adaptive',
          'TrueDepth Notch': 'Dynamic Island pill micro-perforation'
        },
        keyInnovations: [
          'Tandem OLED stacking doubles lifespan while reducing power consumption by 30%',
          'Micro-Lens Array (MLA) boosting optical extraction efficiency without heating',
          'Border Reduction Structure (BRS) shrinking outer bezels to 1.15mm'
        ],
        meshType: 'display_panel',
        position: [0, 0, -0.22],
        dimensions: [3.4, 7.2, 0.05],
        colorHex: '#030712',
        roughness: 0.1,
        metalness: 0.2,
        opacity: 0.95,
        highlightColor: '#fb923c'
      },
      {
        id: 'ip18-chassis',
        name: 'Chassis Frame & Diffusion Midplate',
        codeName: 'Grade 5 Titanium + 100% Recycled Aluminum Core',
        category: 'chassis',
        layerZ: -1.6,
        layerGroup: 'chassis',
        functionSummary: 'Solid-state diffusion bonded dual-metal chassis blending the beauty of brushed titanium with the thermal performance of aluminum.',
        detailedArchitecture: 'Outer perimeter fabricated from Grade 5 Titanium (Ti-6Al-4V) precision CNC contoured, joined to a 100% recycled aluminum internal subframe through thermomechanical solid-state diffusion bonding under extreme hydraulic pressure and heat.',
        materials: [
          { name: 'Grade 5 Titanium Band', chemicalSymbol: 'Ti-6Al-4V', percentage: '45%', purpose: 'Brushed outer perimeter providing dent and scratch defense', rarity: 'critical', colorHex: '#71717a' },
          { name: '100% Recycled Aerospace Aluminum', chemicalSymbol: 'Al 6013-T6', percentage: '42%', purpose: 'Internal heat conduction subframe bonded to titanium', colorHex: '#d4d4d8' },
          { name: 'Recycled Gold & Rare Earth Magnets', chemicalSymbol: 'Au / NdFeB', percentage: '7%', purpose: 'MagSafe perimeter alignment array and screw threads', rarity: 'precious', colorHex: '#facc15' },
          { name: 'High-Strength Bio-Resin Antenna Seams', chemicalSymbol: 'Bio-Polymer', percentage: '6%', purpose: 'Electromagnetic pass-through channels for mmWave 5G', colorHex: '#a1a1aa' }
        ],
        specs: {
          'Diffusion Bond Strength': '> 300 MPa inter-metallic joint shear',
          'Weight Reduction': '24 grams lighter than stainless steel equivalents',
          'Action Button & Camera Control': 'Solid-state capacitive sapphire touch keys with force sensors'
        },
        keyInnovations: [
          'Solid-state diffusion bonding eliminating glue or mechanical fasteners between metals',
          'Sapphire crystal capacitive Camera Control strip with two-stage shutter actuation',
          'Internal structural cavity optimized for L-shaped battery cell'
        ],
        meshType: 'chassis_frame',
        position: [0, 0, -0.05],
        dimensions: [3.5, 7.3, 0.28],
        colorHex: '#3f3f46',
        roughness: 0.35,
        metalness: 0.9,
        highlightColor: '#f97316'
      },
      {
        id: 'ip18-cooling',
        name: 'Cooling Subsystem (Graphite Sheets & Subframe)',
        codeName: 'Thermal Diffusion Matrix with Graphene Layers',
        category: 'cooling',
        layerZ: -0.8,
        layerGroup: 'cooling',
        functionSummary: 'Multi-layer pyrolytic graphite foils and copper heat spreaders conducting heat directly into the titanium outer rails.',
        detailedArchitecture: 'Features dual ultra-thin (0.025mm) multi-layer synthetic graphite sheets sandwiching the logic board, mated with laser-welded copper heat sinks directly over the A20 Pro SoC to rapidly distribute thermal energy away from the user’s hand.',
        materials: [
          { name: 'Pyrolytic Graphite Foil (PGS)', chemicalSymbol: 'Graphite (C)', percentage: '62%', purpose: 'High in-plane thermal conductivity spreading heat laterally', colorHex: '#27272a' },
          { name: 'Electrolytic Copper Foil Heat Shield', chemicalSymbol: 'Cu (99.9%)', percentage: '26%', purpose: 'Conducts heat from A20 Pro Bionic to aluminum frame', colorHex: '#b45309' },
          { name: 'Phase-Change Thermal Paste', chemicalSymbol: 'Gallium-Indium Polymer', percentage: '12%', purpose: 'High thermal interface conductivity bridging micro-gaps', rarity: 'critical', colorHex: '#9ca3af' }
        ],
        specs: {
          'Thermal Conductivity': '1,950 W/m·K in-plane (PGS)',
          'Sustained Performance': '28% longer peak gaming framerates without thermal throttling',
          'Thickness': '0.045mm ultra-compact profile'
        },
        keyInnovations: [
          'Direct-to-chassis thermal pathway venting heat toward the titanium rails',
          'Non-capacitive shielding preserving full capacitive touch sensitivity',
          'Graphene-infused heat spreader over fast wireless charging coil'
        ],
        meshType: 'vapor_chamber',
        position: [0.0, 0.3, 0.05],
        dimensions: [2.5, 4.0, 0.05],
        colorHex: '#78350f',
        roughness: 0.3,
        metalness: 0.85,
        highlightColor: '#f97316'
      },
      {
        id: 'ip18-soc',
        name: 'Processor / SoC',
        codeName: 'Apple A20 Pro Bionic Neural Silicon',
        category: 'processor',
        layerZ: 0.0,
        layerGroup: 'chips',
        functionSummary: 'Next-generation 2nm silicon computing engine with 6 CPU cores, 6-core Neural Ray Tracing GPU, and 16-core Neural Engine.',
        detailedArchitecture: 'Fabricated on TSMC’s premier 2nm N2P process. Features 2 Performance cores @ 4.4 GHz and 4 Efficiency cores, coupled with a 16-core Apple Neural Engine capable of 65 TOPS on-device Apple Intelligence processing, and hardware mesh shading with hardware BVH traversal.',
        materials: [
          { name: 'Ultra-Pure 2nm Monocrystalline Silicon', chemicalSymbol: 'Si (99.9999999%)', percentage: '48%', purpose: 'Houses over 30 billion GAA transistors and nano-wires', rarity: 'critical', colorHex: '#3f3f46' },
          { name: 'Low-k Organosilicate Dielectrics', chemicalSymbol: 'SiCOH', percentage: '22%', purpose: 'Insulates copper wiring layers to prevent parasitic capacitance', colorHex: '#a1a1aa' },
          { name: 'Copper Dual-Damascene Metallization', chemicalSymbol: 'Cu', percentage: '20%', purpose: 'Sub-micron interconnects linking logic gates', colorHex: '#d97706' },
          { name: 'Gold-Plated Solder Micro-Balls (SAC305)', chemicalSymbol: 'Sn-Ag-Cu-Au', percentage: '10%', purpose: 'Mounts package directly to Substrate-Like PCB', rarity: 'precious', colorHex: '#eab308' }
        ],
        specs: {
          'Transistor Density': '245 Million transistors per mm²',
          'Total Transistors': '31.2 Billion',
          'Neural Engine': '16-Core NPU delivering 65 TOPS FP16/INT8',
          'GPU Architecture': '6-Core with Dynamic Caching & Neural Ray Tracing',
          'Memory Subsystem': '16GB Unified LPDDR5T @ 9,600 Mbps'
        },
        keyInnovations: [
          'First 2nm commercial smartphone silicon with backside power delivery (PowerVia)',
          'Neural Ray Tracing engine calculating light bounces directly in hardware',
          'Secure Enclave 4.0 with physical unclonable function (PUF) cryptography'
        ],
        meshType: 'soc',
        position: [-0.35, 1.35, 0.16],
        dimensions: [1.15, 1.15, 0.08],
        colorHex: '#18181b',
        roughness: 0.2,
        metalness: 0.8,
        highlightColor: '#f97316'
      },
      {
        id: 'ip18-modem',
        name: '5G Modem & RF Transceiver Chip',
        codeName: 'Apple Custom C2 5G Baseband & RF Engine',
        category: 'connectivity',
        layerZ: 0.3,
        layerGroup: 'chips',
        functionSummary: 'Apple’s proprietary custom-designed 5G modem silicon supporting mmWave, Sub-6, and direct satellite constellation links.',
        detailedArchitecture: 'Designed in-house by Apple, the C2 modem combines a high-speed baseband DSP with dual RF transceiver dies. Seamlessly integrates with iOS for dynamic antenna tuning, reducing power draw by 28% during high-speed cellular streaming and supporting low-orbit emergency satellite text & voice.',
        materials: [
          { name: 'Silicon BiCMOS RF Foundry Die', chemicalSymbol: 'SiGe-BiCMOS', percentage: '40%', purpose: 'High-linearity radio frequency front-end processing', rarity: 'critical', colorHex: '#52525b' },
          { name: 'Low-Temperature Co-Fired Ceramics', chemicalSymbol: 'LTCC Ceramic', percentage: '28%', purpose: 'Bandpass filters isolating 5G NR and LTE frequency bands', colorHex: '#e4e4e7' },
          { name: 'Gallium Nitride on Silicon (GaN-on-Si)', chemicalSymbol: 'GaN-Si', percentage: '18%', purpose: 'Ultra-efficient power amplifiers for satellite uplink', rarity: 'critical', colorHex: '#cbd5e1' },
          { name: 'Gold Wire Micro-Bonding', chemicalSymbol: 'Au (99.99%)', percentage: '14%', purpose: 'Ultra-clean radio signal transfer to exterior antenna bands', rarity: 'precious', colorHex: '#facc15' }
        ],
        specs: {
          'Architecture': 'Apple-designed proprietary 5G baseband',
          'Max Downlink': '10.5 Gbps with 4x Carrier Aggregation',
          'Satellite Uplink': 'Direct-to-satellite voice, text, and Find My telemetry',
          'Energy Efficiency': '28% lower energy draw compared to previous discrete modems'
        },
        keyInnovations: [
          'Deep iOS baseband sleep telemetry synchronizing network requests in packets',
          'Ultra-compact module size saving 22% motherboard footprint',
          'Dual SIM + Dual eSIM simultaneous active connections'
        ],
        meshType: 'modem',
        position: [0.65, 1.45, 0.16],
        dimensions: [0.85, 0.85, 0.07],
        colorHex: '#27272a',
        roughness: 0.3,
        metalness: 0.7,
        highlightColor: '#f97316'
      },
      {
        id: 'ip18-motherboard',
        name: 'Main Logic Board / Motherboard',
        codeName: 'Dual-Stacked Substrate-Like PCB (SLP)',
        category: 'motherboard',
        layerZ: 0.6,
        layerGroup: 'motherboard',
        functionSummary: 'Sandwiched two-board logic assembly joined by thousands of microscopic solder balls to minimize space.',
        detailedArchitecture: 'Two Substrate-Like PCB (SLP) boards soldered together via a peripheral interposer ring containing over 14,000 micro-solder balls. Features trace widths down to 15µm, housing the A20 Pro SoC, RAM, flash storage, power management ICs, and audio codecs.',
        materials: [
          { name: 'Modified Polyimide & Low-Loss Resin', chemicalSymbol: 'm-PI Resin', percentage: '36%', purpose: 'High-frequency signal propagation with zero attenuation', colorHex: '#14532d' },
          { name: 'High-Purity Copper Traces', chemicalSymbol: 'Cu', percentage: '40%', purpose: 'Micro-traces routing high-speed DDR and PCIe signals', colorHex: '#d97706' },
          { name: 'Tin-Silver-Copper Interposer Solder', chemicalSymbol: 'Sn96.5-Ag3.0-Cu0.5', percentage: '12%', purpose: '14,000 micro-bumps fusing top and bottom logic boards', colorHex: '#94a3b8' },
          { name: 'Nickel-Iron Magnetic Shield Covers', chemicalSymbol: 'Mu-Metal / NiFe', percentage: '12%', purpose: 'Faraday covers preventing electromagnetic radio interference', colorHex: '#71717a' }
        ],
        specs: {
          'Construction': 'Dual-board stacked Sandwich SLP with interposer',
          'Micro-Via Pitch': '25µm diameter laser-ablated vias',
          'PMIC Integration': 'Custom Apple power management chips with micro-second voltage steps',
          'Total Thickness': '1.35mm assembled sandwich module'
        },
        keyInnovations: [
          'Double-density component packaging leaving 75% of phone chassis volume for battery',
          'Thermal inter-layer vias conducting heat directly to frame structure',
          '100% recycled gold in wire bonding and printed circuit board plating'
        ],
        meshType: 'motherboard',
        position: [0.1, 1.25, 0.12],
        dimensions: [2.8, 3.2, 0.1],
        colorHex: '#1e3a2f',
        roughness: 0.4,
        metalness: 0.4,
        highlightColor: '#10b981'
      },
      {
        id: 'ip18-memory',
        name: 'RAM & Flash Storage Chips',
        codeName: '16GB Unified LPDDR5T + 1TB Apple NVMe',
        category: 'memory',
        layerZ: 0.9,
        layerGroup: 'chips',
        functionSummary: 'Low-power High-Speed Unified RAM accessible simultaneously by CPU, GPU, and NPU, plus custom PCIe NVMe flash.',
        detailedArchitecture: 'The 16GB Unified Memory is wire-bonded directly on the A20 Pro package via PoP packaging, offering unified low-latency zero-copy memory access. The 1TB storage features a custom Apple SSD controller driving BiCS 3D TLC NAND with dedicated hardware AES-256 engines.',
        materials: [
          { name: 'High-K Dielectric DRAM Capacitors', chemicalSymbol: 'HfO2 / ZrO2', percentage: '48%', purpose: 'Micro-capacitors holding temporary bits with high retention', colorHex: '#52525b' },
          { name: '3D BiCS Floating Gate Silicon', chemicalSymbol: 'Poly-Si / Si3N4', percentage: '30%', purpose: '232 layers of flash memory cells storing user files', colorHex: '#3f3f46' },
          { name: '100% Recycled Gold Wire Bonds', chemicalSymbol: 'Au (99.99%)', percentage: '12%', purpose: 'Conducts gigabit data lines between memory dies', rarity: 'precious', colorHex: '#facc15' },
          { name: 'Underfill Structural Polymer', chemicalSymbol: 'Epoxy Resin', percentage: '10%', purpose: 'Absorbs mechanical shock when phone is dropped', colorHex: '#1c1917' }
        ],
        specs: {
          'RAM Speed': '9,600 Mbps (LPDDR5T High-Bandwidth)',
          'Unified Memory Bus': '128-bit wide bus yielding 76.8 GB/s bandwidth',
          'NVMe Read Speed': '4,200 MB/s Sequential',
          'Encryption': 'Hardware AES-256 with Secure Enclave hardware keys'
        },
        keyInnovations: [
          'Unified architecture enables 16GB RAM to be utilized entirely by AI models on demand',
          'Zero-copy texture sharing between neural networks and GPU shaders',
          'Hardware-level cryptographic memory scrubbing upon phone lock'
        ],
        meshType: 'memory_chips',
        position: [-0.35, 1.35, 0.23],
        dimensions: [1.15, 1.15, 0.05],
        colorHex: '#18181b',
        roughness: 0.3,
        metalness: 0.6,
        highlightColor: '#fb923c'
      },
      {
        id: 'ip18-battery',
        name: 'Battery (L-Shaped Silicon Anode in Steel Case)',
        codeName: '4,950 mAh L-Shaped High-Density Pack',
        category: 'battery',
        layerZ: 1.3,
        layerGroup: 'battery',
        functionSummary: 'Custom L-shaped cell housed in a laser-welded stainless steel jacket for thermal dissipation and puncture protection.',
        detailedArchitecture: 'Two interlocking electrode coils arranged in an L-shape to maximize internal chassis volume around the logic board. Utilizes silicon-carbon doped anodes, 100% recycled cobalt in the cathode, and a structural steel outer casing that dissipates heat evenly into the frame.',
        materials: [
          { name: '100% Recycled Cobalt Cathode', chemicalSymbol: 'LiCoO2', percentage: '36%', purpose: 'High energy density cathode with sustainable ethical origin', rarity: 'critical', colorHex: '#475569' },
          { name: 'Silicon-Carbon Nanocomposite Anode', chemicalSymbol: 'Si-C', percentage: '24%', purpose: 'Accommodates higher lithium concentration per cubic millimeter', rarity: 'critical', colorHex: '#1e293b' },
          { name: 'SUS304 Laser-Welded Stainless Steel Shell', chemicalSymbol: 'Fe-Cr-Ni', percentage: '18%', purpose: 'Structural casing preventing pouch swelling and puncture', colorHex: '#94a3b8' },
          { name: 'Fluorinated Organic Carbonate Electrolyte', chemicalSymbol: 'LiPF6-FEC', percentage: '12%', purpose: 'High-voltage stable electrolyte with fire-retardant chemistry', colorHex: '#93c5fd' },
          { name: 'Recycled Tin & Copper Battery Tabs', chemicalSymbol: 'Cu-Ni-Sn', percentage: '10%', purpose: 'Laser-welded connection busbars to battery management board', colorHex: '#f59e0b' }
        ],
        specs: {
          'Capacity': '4,950 mAh (19.4 Wh)',
          'Battery Enclosure': 'Rigid stainless steel laser-welded can',
          'Charge Rates': 'Up to 50% charge in 25 minutes via 35W+ adapter',
          'Recycled Content': '100% recycled cobalt, 95% recycled lithium, 100% recycled gold'
        },
        keyInnovations: [
          'Laser-welded stainless steel enclosure eliminates pouch expansion space requirement',
          'Electrical debonding adhesive releasing cleanly via a low-voltage 9V battery connection',
          'Independent battery telemetry microcontroller logging thermal stress cycles'
        ],
        meshType: 'battery',
        position: [0.1, -1.2, 0.12],
        dimensions: [2.7, 3.8, 0.16],
        colorHex: '#1c1917',
        roughness: 0.35,
        metalness: 0.4,
        highlightColor: '#22c55e'
      },
      {
        id: 'ip18-cameras',
        name: 'Pro Camera System & Tetraprism 5x Telephoto',
        codeName: 'Triple 48MP Optics with 3D Sensor-Shift OIS',
        category: 'camera',
        layerZ: 1.8,
        layerGroup: 'cameras',
        functionSummary: 'Triple 48MP camera setup featuring second-generation 3D sensor-shift optical image stabilization and folded tetraprism glass.',
        detailedArchitecture: 'Main 48MP sensor with quad-pixel binning and 3D sensor-shift OIS moving the sensor along X, Y, and Z axes. The 5x telephoto bounces light through a precision tetraprism glass structure reflecting light 4 times, delivering 120mm focal length inside a slim form factor.',
        materials: [
          { name: 'Multi-Reflection Optical Glass Tetraprism', chemicalSymbol: 'Schott N-BK7 / Lanthanum Glass', percentage: '32%', purpose: '4x folded optical path reflecting light through total internal reflection', colorHex: '#38bdf8' },
          { name: 'Sapphire Crystal Protective Windows', chemicalSymbol: 'Al2O3 (Single Crystal)', percentage: '22%', purpose: 'Mohs 9 hardness scratch defense with anti-reflective coating', rarity: 'precious', colorHex: '#67e8f9' },
          { name: '100% Recycled Neodymium Magnets (N54)', chemicalSymbol: 'NdFeB', percentage: '20%', purpose: 'Drives 3D Sensor-Shift voice coil micro-actuators', rarity: 'rare_earth', colorHex: '#475569' },
          { name: 'Titanium Lens Trim Ring with PVD', chemicalSymbol: 'Ti-6Al-4V', percentage: '14%', purpose: 'Protective raised bezel surrounding optical apertures', colorHex: '#94a3b8' },
          { name: 'Stacked BSI CMOS Silicon Sensor', chemicalSymbol: 'Si', percentage: '12%', purpose: 'Dual-gain architecture pixel array capturing HDR dynamic range', colorHex: '#1e293b' }
        ],
        specs: {
          'Main Lens': '48MP Fusion (24mm, f/1.6, 2.44µm quad-pixel, 3D sensor shift)',
          'Telephoto Lens': '48MP 5x Tetraprism (120mm equivalent, f/2.8, 3D optical shift)',
          'Ultra Wide Lens': '48MP (13mm, f/2.2, 120° FOV, hybrid PDAF focus)',
          'Video Recording': '4K at 120 fps Dolby Vision HDR / Apple ProRes Log'
        },
        keyInnovations: [
          'Tetraprism glass reflects light four times beneath the glass before hitting sensor',
          '3D Sensor-Shift OIS stabilizes pitch, yaw, roll, and translation up to 10,000 micro-adjustments/sec',
          'Atomic Layer Deposition (ALD) anti-reflective coating eliminating internal ghosting flare'
        ],
        meshType: 'camera_module',
        position: [-0.75, 2.05, 0.25],
        dimensions: [1.85, 1.85, 0.28],
        colorHex: '#0f172a',
        roughness: 0.15,
        metalness: 0.9,
        highlightColor: '#fb923c'
      },
      {
        id: 'ip18-sensors',
        name: 'TrueDepth Face ID & LiDAR Scanner Matrix',
        codeName: 'VCSEL Dot Projector + LiDAR Depth Radar',
        category: 'sensors',
        layerZ: 2.1,
        layerGroup: 'chips',
        functionSummary: 'Infrared optical projectors and photon-detecting avalanche diodes for biometric authentication and 3D spatial mapping.',
        detailedArchitecture: 'Face ID TrueDepth array emits over 30,000 invisible infrared dots via a Vertical-Cavity Surface-Emitting Laser (VCSEL) to compute a 3D topographic facial mesh. The LiDAR scanner pulses nanosecond infrared light to measure time-of-flight depth up to 5 meters.',
        materials: [
          { name: 'Gallium Arsenide VCSEL Lasers', chemicalSymbol: 'GaAs', percentage: '38%', purpose: 'Infrared laser array pulsing 30,000 structured light beams', rarity: 'critical', colorHex: '#a855f7' },
          { name: 'Single-Photon Avalanche Diodes (SPAD)', chemicalSymbol: 'Silicon SPAD', percentage: '32%', purpose: 'Detects individual arriving photons with picosecond precision', colorHex: '#3b82f6' },
          { name: 'Diffractive Optical Element (DOE) Quartz', chemicalSymbol: 'Fused Silica SiO2', percentage: '18%', purpose: 'Splits laser beam into 30,000 precise spatial projection dots', colorHex: '#e0e7ff' },
          { name: 'Gold-Plated Contact Ribbon', chemicalSymbol: 'Au', percentage: '12%', purpose: 'High-speed encrypted transmission to Secure Enclave', rarity: 'precious', colorHex: '#fbbf24' }
        ],
        specs: {
          'LiDAR Detection Range': 'Up to 5 meters in bright sunlight or total darkness',
          'Face ID False Acceptance': 'Less than 1 in 1,000,000 biometric attempts',
          'Spatial Video Integration': 'Synchronizes LiDAR depth map with stereo cameras'
        },
        keyInnovations: [
          'Sub-surface infrared optical pathway hidden beneath Dynamic Island screen pixels',
          'Direct spatial mesh generation powering Vision Pro spatial audio and AR positioning',
          'Ambient Light Sensor (ALS) monitoring ambient color temperature across 360 degrees'
        ],
        meshType: 'sensors_cluster',
        position: [0.0, -0.6, 0.18],
        dimensions: [1.4, 1.8, 0.05],
        colorHex: '#18181b',
        roughness: 0.3,
        metalness: 0.5,
        highlightColor: '#c084fc'
      },
      {
        id: 'ip18-audio-haptics',
        name: 'Taptic Engine & Spatial Audio Drivers',
        codeName: 'Advanced Linear Resonance Actuator + Acoustic Chambers',
        category: 'audio_haptics',
        layerZ: 2.4,
        layerGroup: 'chassis',
        functionSummary: 'Sub-millisecond tactile haptic engine creating physical keyboard clicks and spatial audio stereo speakers.',
        detailedArchitecture: 'The Taptic Engine houses a suspended magnetic tungsten slug driven by dual magnetic coils of 100% recycled copper wire. The stereo speaker modules utilize sealed resonance cavities with laser-tuned acoustic ports for immersive Dolby Atmos sound.',
        materials: [
          { name: '100% Recycled Rare Earth Neodymium Magnets', chemicalSymbol: 'NdFeB', percentage: '45%', purpose: 'Generates linear magnetic propulsion for tactile haptics', rarity: 'rare_earth', colorHex: '#52525b' },
          { name: 'Dense Sintered Tungsten Counterweight', chemicalSymbol: 'W', percentage: '30%', purpose: 'Heavy moving slug providing crisp, instantaneous tactile feedback', rarity: 'critical', colorHex: '#71717a' },
          { name: '100% Recycled Copper Voice Coils', chemicalSymbol: 'Cu', percentage: '15%', purpose: 'Transfers high-current pulse signals into mechanical force', colorHex: '#ea580c' },
          { name: 'Spring Steel Suspensions (Maraging Steel)', chemicalSymbol: 'Fe-Ni-Co-Mo', percentage: '10%', purpose: 'Durable flexure suspension surviving 50 million cycles', colorHex: '#cbd5e1' }
        ],
        specs: {
          'Tactile Response Time': 'Under 3 milliseconds from trigger to peak force',
          'Haptic Bandwidth': '50Hz to 350Hz variable frequency tactile waveforms',
          'Speaker Acoustic Output': 'Stereo Dolby Atmos with Spatial Audio head-tracking',
          'Recycled Content': '100% recycled tungsten and 100% recycled rare earth elements'
        },
        keyInnovations: [
          'Haptic waveform rendering mimics the physical mechanical click of rotary dials',
          'Real-time acoustic impedance compensation adjusting speaker output to holding grip',
          'Zero-latency acoustic echo cancellation for dual beamforming microphones'
        ],
        meshType: 'audio_taptic',
        position: [0.0, -3.1, 0.15],
        dimensions: [2.6, 0.7, 0.12],
        colorHex: '#27272a',
        roughness: 0.35,
        metalness: 0.8,
        highlightColor: '#fbbf24'
      },
      {
        id: 'ip18-back-glass',
        name: 'Frosted Ceramic Back Glass & MagSafe Array',
        codeName: 'Dual-Ion Exchange Textured Matte Glass with Qi2 / MagSafe',
        category: 'chassis',
        layerZ: 2.8,
        layerGroup: 'back',
        functionSummary: 'Custom-formulated frosted back panel with embedded magnetic ring for MagSafe 2.0 accessories and fast induction.',
        detailedArchitecture: 'Crafted through a dual-ion exchange chemical process to introduce ceramic crystals into the glass matrix. Features a micro-etched matte finish, color-infused throughout the glass substrate, and an array of 18 neodymium magnets for MagSafe alignment.',
        materials: [
          { name: 'Dual-Ion Exchange Ceramic Infused Glass', chemicalSymbol: 'SiO2-Al2O3-K+', percentage: '68%', purpose: 'Extreme drop resistance with soft tactile satin texture', colorHex: '#3f3f46' },
          { name: '100% Recycled Rare Earth MagSafe Magnets', chemicalSymbol: 'NdFeB', percentage: '16%', purpose: '18 circular magnets providing 1.2 kg magnetic clamping force', rarity: 'rare_earth', colorHex: '#71717a' },
          { name: 'High-Efficiency Litz Copper Induction Coil', chemicalSymbol: 'Cu (99.99%)', percentage: '12%', purpose: 'MagSafe 2.0 wireless charging delivering up to 45W peak', colorHex: '#f97316' },
          { name: 'Recycled Aluminum Camera Plateau Deco', chemicalSymbol: 'Al 6013', percentage: '4%', purpose: 'Sculpted camera island flowing seamlessly from back glass', colorHex: '#a1a1aa' }
        ],
        specs: {
          'Wireless Charging': '45W MagSafe 2.0 / 25W Qi2 Universal',
          'MagSafe Holding Force': '12 Newtons magnetic pull force',
          'Texture Etch': 'Micro-nano acid etch resisting fingerprints and oil',
          'Color Depth': 'Custom metallic pigment infused throughout substrate'
        },
        keyInnovations: [
          'Back glass is independently removable from the frame, dramatically slashing repair costs',
          'Laser-milled camera island sculpted from a single solid sheet of glass',
          'Integrated NFC antenna tuned specifically for Apple Pay tap-to-pay transactions'
        ],
        meshType: 'back_glass',
        position: [0, 0, 0.32],
        dimensions: [3.4, 7.2, 0.06],
        colorHex: '#18181b',
        roughness: 0.25,
        metalness: 0.4,
        opacity: 0.88,
        highlightColor: '#fb923c'
      }
    ]
  },
  {
    id: 'oneplus-15',
    name: 'OnePlus 15',
    marketingName: 'OnePlus 15 Pro (Cryo-Speed Flagship)',
    brand: 'OnePlus',
    year: 2026,
    tagline: 'Extreme 6,100 mAh Glacier Silicon Battery, 120W SuperVOOC & Cryo-Velocity 3D Ti-Ice Vapor Chamber',
    frameColor: '#1e3a47',
    backColor: '#0a1924',
    accentColor: '#10b981',
    screenSize: '6.82" 2K BOE X3 Oriental OLED (1-120Hz 8T LTPO)',
    weightGrams: 219,
    thicknessMm: 8.4,
    ipRating: 'IP69 (High-pressure hot steam jet resistance)',
    keySpecs: {
      soc: 'Snapdragon 8 Elite Gen 5 (Custom Performance Tuning)',
      processNode: 'TSMC 2nm GAA Silicon',
      ram: '24GB LPDDR5X (10.7 Gbps Ultra-Capacity)',
      storage: '1TB UFS 4.1 Storage with Dual-Lane Turbo',
      battery: '6,100 mAh Glacier Silicon-Carbon Dual-Cell',
      charging: '120W SuperVOOC Wired (0-100% in 19m) + 50W AirVOOC',
      display: 'BOE X3 2K Oriental Screen, 4,500 nits, 2160Hz PWM',
      mainCamera: '50MP Sony LYT-900 1-inch sensor, Hasselblad Gen 6',
      telephotoCamera: '64MP Periscope 3x Telephoto (ALC Coating)',
      cooling: 'Ti-Ice 3D Vapor Chamber (10,000mm² Titanium Wick)',
      materials: 'Aviation-grade Aluminum, Silk-Touch Glass, Ceramic Ring'
    },
    sustainabilityScore: 86,
    recycledMaterialsPercent: 38,
    components: [
      {
        id: 'op15-display',
        name: 'Display Panel & Digitizer',
        codeName: 'BOE X3 Oriental OLED 2K Screen',
        category: 'display',
        layerZ: -2.8,
        layerGroup: 'display',
        functionSummary: 'Record-shattering 4,500 nits peak brightness OLED display with military-grade rain-water touch algorithm.',
        detailedArchitecture: 'Constructed with custom BOE luminescence organic materials, 8T LTPO circuitry with independent drive pixels, 2,160Hz ultra-high frequency PWM eye protection dimming, and an ultrasonic underwater touch digitizer chip.',
        materials: [
          { name: 'Corning Gorilla Glass Victus 2', chemicalSymbol: 'Aluminosilicate Glass', percentage: '65%', purpose: 'Drop and scratch resistant front shield', colorHex: '#94a3b8' },
          { name: 'X3 High-Efficiency Luminescence Dyes', chemicalSymbol: 'Organic Dopants', percentage: '12%', purpose: 'Emits 4,500 nits with 18% lower power draw', colorHex: '#10b981' },
          { name: '8T LTPO Silicon Oxide Transistors', chemicalSymbol: 'IGZO / Polysilicon', percentage: '13%', purpose: 'Maintains pixel brightness uniformity at 1Hz idle', colorHex: '#34d399' },
          { name: 'Self-Capacitive Water-Resistant Grid', chemicalSymbol: 'ITO Matrix', percentage: '10%', purpose: 'Eliminates ghost touches when screen is wet or greasy', colorHex: '#6ee7b7' }
        ],
        specs: {
          'Resolution': '3168 x 1440 2K+ (510 ppi)',
          'Peak Brightness': '4,500 nits Local HDR / 1,600 nits Global HBM',
          'PWM Frequency': '2,160Hz High-Frequency Dimming (TÜV Rheinland certified)',
          'Touch Polling': 'Touch response rate up to 1,000Hz in game mode'
        },
        keyInnovations: [
          'Aqua Touch 2.0 algorithm allows precise gaming touches even under pouring water',
          'Custom Display P2 chip improving color accuracy to Delta E < 0.35',
          'Super-linear eye protection mode filtering harmful blue wavelengths at hardware level'
        ],
        meshType: 'display_panel',
        position: [0, 0, -0.22],
        dimensions: [3.4, 7.2, 0.05],
        colorHex: '#022c22',
        roughness: 0.1,
        metalness: 0.2,
        opacity: 0.95,
        highlightColor: '#10b981'
      },
      {
        id: 'op15-cooling',
        name: 'Cooling System (Ti-Ice 3D Vapor Chamber)',
        codeName: 'Cryo-Velocity 10,000mm² Ti-Alloy Dual-Drive VC',
        category: 'cooling',
        layerZ: -0.8,
        layerGroup: 'cooling',
        functionSummary: 'Massive 10,000mm² vapor chamber utilizing aerospace-grade titanium wick capillary structure for sustained gaming.',
        detailedArchitecture: 'Dual-drive vapor chamber with a laser-welded titanium upper skin and high-conductivity copper base plate. Houses an aerospace aerogel insulation barrier that isolates heat from the display while channeling it directly out through the chassis.',
        materials: [
          { name: 'Super-Conducting Copper Baseplate', chemicalSymbol: 'Cu (99.99%)', percentage: '55%', purpose: 'Rapid heat extraction directly off SoC and charge ICs', colorHex: '#b45309' },
          { name: 'Laser-Etched Titanium Wick Mesh', chemicalSymbol: 'Ti', percentage: '22%', purpose: 'High capillary force driving condensed coolant back to die', rarity: 'critical', colorHex: '#64748b' },
          { name: 'Supercritical Aerogel Thermal Barrier', chemicalSymbol: 'SiO2 Aerogel', percentage: '15%', purpose: 'Shields screen and user fingers from thermal spike', colorHex: '#e2e8f0' },
          { name: 'Deionized Low-Boiling Coolant', chemicalSymbol: 'H2O-Alkanes', percentage: '8%', purpose: 'Working fluid evaporating at 31°C under partial vacuum', colorHex: '#38bdf8' }
        ],
        specs: {
          'Vapor Chamber Area': '10,000 mm² total combined surface',
          'Cooling Performance': 'Reduces peak SoC temperature by up to 13.5°C in gaming',
          'Thermal Resistance': '0.08 K/W ultra-low impedance'
        },
        keyInnovations: [
          'Dual-circuit circulation separating CPU cooling loop from 120W charging IC loop',
          'Aerospace-grade aerogel insulator blocking heat conduction toward display surface',
          'Titanium capillary mesh resisting degradation over 10 years of thermal cycles'
        ],
        meshType: 'vapor_chamber',
        position: [0.1, 0.4, 0.05],
        dimensions: [2.6, 4.4, 0.06],
        colorHex: '#047857',
        roughness: 0.3,
        metalness: 0.9,
        highlightColor: '#10b981'
      },
      {
        id: 'op15-soc',
        name: 'Processor / SoC',
        codeName: 'Snapdragon 8 Elite Gen 5 (Trinity Gaming Engine)',
        category: 'processor',
        layerZ: 0.0,
        layerGroup: 'chips',
        functionSummary: 'Custom micro-architectural scheduling allocating dynamic clock speeds across Oryon V3 CPU cores and Adreno GPU.',
        detailedArchitecture: 'TSMC 2nm GAA technology running dual Prime cores up to 4.6GHz. Paired with OnePlus proprietary Trinity Engine software kernel rewriting Android thread dispatching at micro-second intervals for stutter-free 144 fps gaming.',
        materials: [
          { name: 'Pure Monocrystalline Silicon (2nm GAA)', chemicalSymbol: 'Si', percentage: '45%', purpose: 'Houses 28+ billion semiconductor transistors', rarity: 'critical', colorHex: '#334155' },
          { name: 'High-Purity Copper Interconnect Layers', chemicalSymbol: 'Cu', percentage: '28%', purpose: 'Multi-layer micro-wiring transferring clock pulses', colorHex: '#ea580c' },
          { name: 'Indium Gallium Liquid Metal TIM', chemicalSymbol: 'In-Ga', percentage: '15%', purpose: 'Zero-thermal-resistance bridge between die and VC', rarity: 'critical', colorHex: '#94a3b8' },
          { name: 'Gold-Silver SMD Contact Bumps', chemicalSymbol: 'Au-Ag-Sn', percentage: '12%', purpose: 'High-current power supply pins to voltage regulators', rarity: 'precious', colorHex: '#facc15' }
        ],
        specs: {
          'Fabrication': 'TSMC 2nm N2 Gate-All-Around (GAA)',
          'Peak Frequency': '4.6 GHz Prime Cores + 3.6 GHz Performance Cores',
          'Gaming Engine': 'Trinity Engine CPU/RAM/ROM Tri-Core Hardware Scheduler',
          'Graphics Ray Tracing': 'Full global illumination support @ 120fps'
        },
        keyInnovations: [
          'Direct liquid-metal TIM application reducing thermal gradient by 8°C',
          'Micro-architecture scheduling algorithm reducing frame drop rate to 0.1%',
          'Independent rendering chip offloading frame-generation interpolation'
        ],
        meshType: 'soc',
        position: [-0.35, 1.35, 0.16],
        dimensions: [1.1, 1.1, 0.08],
        colorHex: '#064e3b',
        roughness: 0.2,
        metalness: 0.8,
        highlightColor: '#10b981'
      },
      {
        id: 'op15-battery',
        name: 'Glacier Battery & 120W Charge Pump',
        codeName: '6,100 mAh Silicon-Carbon Dual-Cell Battery',
        category: 'battery',
        layerZ: 1.3,
        layerGroup: 'battery',
        functionSummary: 'Revolutionary high-capacity silicon-carbon battery providing 2-day endurance with ultra-fast 120W wired charging.',
        detailedArchitecture: 'Developed in partnership with CATL, the Glacier battery utilizes bionic honeycomb silicon-carbon structure delivering 763 Wh/L energy density. Driven by dual independent charging pump ICs that distribute 120W power evenly without overheating.',
        materials: [
          { name: 'Bionic Honeycomb Silicon-Carbon Anode', chemicalSymbol: 'Si-C Composite', percentage: '30%', purpose: 'Higher lithium capacity with structural expansion chambers', rarity: 'critical', colorHex: '#1e293b' },
          { name: 'High-Nickel Ternary Cathode Foil', chemicalSymbol: 'Li-Ni-Co-Mn', percentage: '36%', purpose: 'Provides sustained high electrical potential at 4.48V', rarity: 'critical', colorHex: '#475569' },
          { name: 'Solid-State Gel Polymer Electrolyte', chemicalSymbol: 'Polymer-LiFSI', percentage: '16%', purpose: 'Non-flammable ion conductor enabling ultra-fast ionic transfer', colorHex: '#6ee7b7' },
          { name: 'Dual Heavy-Gauge Copper Busbar Tabs', chemicalSymbol: 'Cu (99.99%)', percentage: '18%', purpose: 'Carries up to 12A continuous charging current without drop', colorHex: '#f59e0b' }
        ],
        specs: {
          'Capacity': '6,100 mAh (23.8 Wh dual-cell design)',
          'Wired Charging': '120W SUPERVOOC (Full 100% recharge in 19 minutes)',
          'Wireless Charging': '50W AIRVOOC magnetic wireless',
          'Lifespan Retention': 'Over 80% healthy capacity after 1,600 charging cycles (4+ years)'
        },
        keyInnovations: [
          'Silicon-carbon matrix achieves highest energy density in any flagship phone',
          'Battery Health Engine with bionic repair algorithms preventing lithium plating',
          'Multi-pole ear cell technology reducing internal DC electrical resistance by 50%'
        ],
        meshType: 'battery',
        position: [0.1, -1.2, 0.12],
        dimensions: [2.7, 3.8, 0.16],
        colorHex: '#022c22',
        roughness: 0.35,
        metalness: 0.3,
        highlightColor: '#10b981'
      },
      {
        id: 'op15-cameras',
        name: 'Hasselblad Camera Array & Periscope',
        codeName: '50MP Sony LYT-900 1-inch + 64MP Periscope Zoom',
        category: 'camera',
        layerZ: 1.8,
        layerGroup: 'cameras',
        functionSummary: 'Flagship optical system featuring a massive 1-inch type Sony sensor with 14 stops of dynamic range and Hasselblad optics.',
        detailedArchitecture: 'Sony LYT-900 1-inch stacked CMOS image sensor utilizing 2-Layer Transistor Pixel technology. Accompanied by a 64MP 3x periscope optical telephoto module coated in ALC (Anti-Reflective Low-Dispersion Coating) and tuned with Hasselblad color science.',
        materials: [
          { name: 'Sony LYT-900 1-inch Stacked Silicon', chemicalSymbol: 'Dual-Layer Si CMOS', percentage: '32%', purpose: 'World-class light gathering sensor with 3.2µm 4-in-1 pixels', rarity: 'critical', colorHex: '#0f172a' },
          { name: 'High-Transmission Fluorite Optical Glass', chemicalSymbol: 'CaF2', percentage: '26%', purpose: 'Lens elements eliminating purple fringing and chromatic aberration', colorHex: '#6ee7b7' },
          { name: 'Sapphire Crystal Dome Cover', chemicalSymbol: 'Al2O3', percentage: '20%', purpose: 'Scratch-proof protective housing across camera island', rarity: 'precious', colorHex: '#38bdf8' },
          { name: 'Magnetic Voice Coil Motors (NdFeB)', chemicalSymbol: 'Nd2Fe14B', percentage: '22%', purpose: 'Sub-micron floating autofocus and prism tilt stabilization', rarity: 'rare_earth', colorHex: '#475569' }
        ],
        specs: {
          'Main Sensor': '50MP Sony LYT-900 (1-inch format, f/1.6, 23mm equivalent)',
          'Telephoto Sensor': '64MP OmniVision OV64B Periscope (f/2.6, 70mm, 3x optical, 120x digital)',
          'Ultra Wide': '50MP Sony LYT-600 (114° field of view, f/2.0)',
          'Color Calibration': '6th Gen Hasselblad Natural Color Solution'
        },
        keyInnovations: [
          '1-inch stacked sensor captures 14-bit RAW with zero shutter lag',
          'ALC nano-coating reduces lens flare by 80% compared to traditional glass',
          'Ceramic camera deco ring protecting lens elements from abrasive impacts'
        ],
        meshType: 'camera_module',
        position: [0.0, 1.85, 0.25],
        dimensions: [2.5, 2.5, 0.28],
        colorHex: '#064e3b',
        roughness: 0.15,
        metalness: 0.9,
        highlightColor: '#10b981'
      },
      {
        id: 'op15-chassis',
        name: 'Aviation Aluminum Unibody & Ceramic Island',
        codeName: 'Aviation-Grade 6000-Series CNC Frame',
        category: 'chassis',
        layerZ: -1.6,
        layerGroup: 'chassis',
        functionSummary: 'Sandblasted aerospace-grade aluminum chassis with an integrated micro-crystalline ceramic camera housing ring.',
        detailedArchitecture: 'Precision milled from aerospace aluminum billets, sandblasted with microscopic ceramic beads for a luxurious matte grip, and engineered with IP69 high-temperature water jet seals and an iconic Alert Slider physical mechanical switch.',
        materials: [
          { name: '6000-Series Aircraft Aluminum Alloy', chemicalSymbol: 'Al-Mg-Si', percentage: '56%', purpose: 'Rigid, lightweight unibody perimeter and internal structure', colorHex: '#64748b' },
          { name: 'Microcrystalline Zirconia Ceramic Ring', chemicalSymbol: 'ZrO2', percentage: '22%', purpose: 'Mohs 8.5 hardness camera plateau shielding lenses', rarity: 'critical', colorHex: '#0f172a' },
          { name: 'Liquid Silicone Rubber (LSR) Gaskets', chemicalSymbol: 'Silicone Elastomer', percentage: '12%', purpose: 'IP68 & IP69 high-pressure steam jet waterproof seals', colorHex: '#34d399' },
          { name: 'Stainless Steel Mechanical Alert Slider', chemicalSymbol: 'SUS316L', percentage: '10%', purpose: 'Textured three-position physical profile toggle switch', colorHex: '#cbd5e1' }
        ],
        specs: {
          'Sealing Rating': 'IP68 + IP69 (withstands 80°C hot water spray at 100 bar)',
          'Alert Slider': 'Three-stage physical toggle (Silent, Vibrate, Ring)',
          'Bead Blast Finish': '120-mesh fine ceramic particle sandblast'
        },
        keyInnovations: [
          'IP69 certification withstands severe industrial cleaning and pressure washing',
          'Micro-curved ergonomics balancing a heavy 6,100 mAh battery comfortably in palm',
          'Integrated ceramic camera island seamlessly flowing into the metallic frame'
        ],
        meshType: 'chassis_frame',
        position: [0, 0, -0.05],
        dimensions: [3.5, 7.3, 0.28],
        colorHex: '#1e3a47',
        roughness: 0.35,
        metalness: 0.85,
        highlightColor: '#10b981'
      },
      {
        id: 'op15-motherboard',
        name: 'Main Logic Board / Motherboard',
        codeName: 'Ultra-Dense Low-Dielectric Rogers PCB',
        category: 'motherboard',
        layerZ: 0.6,
        layerGroup: 'motherboard',
        functionSummary: '12-layer ultra-thin logic board utilizing Rogers high-frequency low-loss laminate for 5G signal purity.',
        detailedArchitecture: 'High-density circuit board featuring gold-plated SMD contact pads, buried thermal vias conducting heat directly to the Ti-Ice vapor chamber, and RF shielding cans packed with thermal graphite paste.',
        materials: [
          { name: 'Rogers Low-Loss Ceramic Laminate', chemicalSymbol: 'PTFE-Ceramic', percentage: '38%', purpose: 'Prevents signal loss at millimeter wave frequencies', colorHex: '#064e3b' },
          { name: 'Electrolytic Copper Signal Layers', chemicalSymbol: 'Cu (99.99%)', percentage: '42%', purpose: 'High-speed signal bus lines connecting 24GB RAM and SoC', colorHex: '#d97706' },
          { name: 'Immersion Gold Plating', chemicalSymbol: 'Au', percentage: '10%', purpose: 'Zero-oxidation solder bonding pads', rarity: 'precious', colorHex: '#fbbf24' },
          { name: 'Copper-Nickel Radio Shield Cages', chemicalSymbol: 'Cu-Ni', percentage: '10%', purpose: 'Shields sensitive audio DAC from 120W charger EMI', colorHex: '#94a3b8' }
        ],
        specs: {
          'Layer Count': '12-Layer Stacked Micro-Via PCB',
          'Impedance Control': '±5% strict RF impedance matching',
          'Thermal Vias': 'Over 3,400 copper-filled micro-vias'
        },
        keyInnovations: [
          'High-density layout allows extra internal clearance for 6,100 mAh battery',
          'Independent power domain routing isolating 120W charging from processor',
          'Custom DAC audio traces delivering 32-bit/384kHz Hi-Res sound'
        ],
        meshType: 'motherboard',
        position: [0.1, 1.25, 0.12],
        dimensions: [2.8, 3.2, 0.1],
        colorHex: '#022c22',
        roughness: 0.4,
        metalness: 0.4,
        highlightColor: '#10b981'
      },
      {
        id: 'op15-audio-haptics',
        name: 'Bionic Turbo Vibration Motor & Stereo Speakers',
        codeName: 'CSA0916 Extra-Large X-Axis Linear Actuator',
        category: 'audio_haptics',
        layerZ: 2.4,
        layerGroup: 'chassis',
        functionSummary: 'Class-leading 602mm³ volume linear haptic motor generating realistic gaming recoil and rich dual stereo speakers.',
        detailedArchitecture: 'Features the CSA0916 Bionic Turbo motor with magnetic core volume of 602mm³, N54SH rare earth magnets, and custom tactile algorithms reproducing over 700 distinct vibrational patterns. Paired with dual super-linear stereo speakers.',
        materials: [
          { name: 'High-Grade Neodymium (N54SH)', chemicalSymbol: 'NdFeB', percentage: '46%', purpose: 'Highest available magnetic flux density for linear motion', rarity: 'rare_earth', colorHex: '#475569' },
          { name: 'Tungsten High-Density Inertial Slug', chemicalSymbol: 'W', percentage: '32%', purpose: 'Moving mass delivering intense 1.9G vibration feedback', rarity: 'critical', colorHex: '#64748b' },
          { name: 'Copper Voice Coils & Flex Springs', chemicalSymbol: 'Cu / BeCu', percentage: '22%', purpose: 'Provides rapid 5ms actuation and brake control', colorHex: '#d97706' }
        ],
        specs: {
          'Motor Volume': '602 mm³ (largest on any Android phone)',
          'Peak Acceleration': '1.9 G acceleration',
          'Response Time': '< 4 milliseconds to full vibration',
          'Speaker Setup': 'Dual Super Linear Stereo with Dirac HD Sound'
        },
        keyInnovations: [
          'Full-link gaming vibration system synchronizing with gunshots and vehicle revs',
          'Micro-resonance technology allows tactile feedback to be felt in specific screen corners',
          'Dual speakers with low-frequency extension down to 300Hz'
        ],
        meshType: 'audio_taptic',
        position: [0.0, -3.1, 0.15],
        dimensions: [2.6, 0.7, 0.12],
        colorHex: '#064e3b',
        roughness: 0.35,
        metalness: 0.8,
        highlightColor: '#10b981'
      },
      {
        id: 'op15-back-glass',
        name: 'Silk-Glass Rear Shell & Wireless Induction',
        codeName: 'Corning Gorilla Glass Victus 2 with Silk-Touch Etch',
        category: 'chassis',
        layerZ: 2.8,
        layerGroup: 'back',
        functionSummary: 'Rear glass panel with micro-crystal silk texturing for zero fingerprints and 50W magnetic wireless induction coil.',
        detailedArchitecture: 'AG velvet glass process utilizing micro-scale chemical etching to form microscopic domes that scatter light while feeling smooth like silk. Embedded beneath is a 50W AIRVOOC wireless charging coil and NFC antenna array.',
        materials: [
          { name: 'Chemically Strengthened Gorilla Glass Victus 2', chemicalSymbol: 'Aluminosilicate Glass', percentage: '72%', purpose: 'Back structural cover resisting drops up to 2 meters', colorHex: '#1e3a47' },
          { name: 'Pure Oxygen-Free Copper Litz Wire Coil', chemicalSymbol: 'Cu (99.99%)', percentage: '16%', purpose: '50W AIRVOOC magnetic wireless charging induction', colorHex: '#ea580c' },
          { name: 'Multi-layer Optical Interference Film', chemicalSymbol: 'TiO2 / SiO2', percentage: '12%', purpose: 'Deep emerald/cyan gradient shimmer beneath glass', colorHex: '#10b981' }
        ],
        specs: {
          'Drop Durability': 'Withstands 2m drops on concrete surfaces',
          'Surface Micro-Roughness': 'Ra = 0.3µm silky tactile feeling',
          'AirVOOC Wireless': '50W wireless charging (0-100% in 45 mins)'
        },
        keyInnovations: [
          'Silk-glass surface completely repels human skin oils without slippery feel',
          'Integrated ferrite shield directing 99% of magnetic field into wireless charger',
          'Thermal graphite backing preventing local hotspot during 50W wireless charging'
        ],
        meshType: 'back_glass',
        position: [0, 0, 0.32],
        dimensions: [3.4, 7.2, 0.06],
        colorHex: '#0a1924',
        roughness: 0.25,
        metalness: 0.4,
        opacity: 0.88,
        highlightColor: '#10b981'
      }
    ]
  }
];
