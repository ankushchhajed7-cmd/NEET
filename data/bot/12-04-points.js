/* NCERT Biology Class XII — Chapter 4: Principles of Inheritance and Variation
   Points book ke page 52, 55–76 se. Page 53–54 (4.1 ki shuruaat) PDF mein nahi the — wo points
   NCERT ke standard text se liye gaye (src53 tag). Questions: 12-04-q1..q3.js */
addChapter({
  id: 'bot-12-04',
  subj: 'bot',
  cls: 12,
  no: 4,
  title: 'Principles of Inheritance and Variation',
  src: 'NCERT Biology XII · Chapter 4',
  points: [
    /* ---------- Intro ---------- */
    { id: 'i1', topic: 'Introduction', t: 'Genetics is the branch of biology that deals with inheritance as well as variation of characters from parents to offspring.' },
    { id: 'i2', topic: 'Introduction', t: 'Inheritance is the process by which characters are passed on from parent to progeny; it is the basis of heredity. Variation is the degree by which progeny differ from their parents.' },
    { id: 'i3', topic: 'Introduction', t: 'Humans knew from as early as 8000–1000 B.C. that one of the causes of variation was hidden in sexual reproduction; they exploited natural variation to selectively breed organisms with desirable characters — artificial selection and domestication (e.g. Sahiwal cows of Punjab from ancestral wild cows).' },

    /* ---------- 4.1 Mendel (book p53-54) ---------- */
    { id: 'm1', topic: '4.1 Mendel\'s Laws of Inheritance', t: 'Gregor Mendel conducted hybridisation experiments on garden peas for seven years (1856–1863) and proposed the laws of inheritance in living organisms.' },
    { id: 'm2', topic: '4.1 Mendel\'s Laws of Inheritance', t: 'Mendel was the first to apply statistical analysis and mathematical logic to problems in biology; his experiments had a large sampling size, giving greater credibility to his data.' },
    { id: 'm3', topic: '4.1 Mendel\'s Laws of Inheritance', t: 'A true-breeding line is one that, having undergone continuous self-pollination, shows stable trait inheritance and expression for several generations.' },
    { id: 'm4', topic: '4.1 Mendel\'s Laws of Inheritance', t: 'Mendel selected 14 true-breeding pea varieties as pairs which were similar except for one character with contrasting traits (7 pairs of contrasting traits).' },
    { id: 'm5', topic: '4.1 Mendel\'s Laws of Inheritance', t: 'Table 4.1 — 7 contrasting traits studied by Mendel in pea: stem height tall/dwarf; flower colour violet/white; flower position axial/terminal; pod shape inflated/constricted; pod colour green/yellow; seed shape round/wrinkled; seed colour yellow/green.' },

    /* ---------- 4.2 One gene ---------- */
    { id: 'o1', topic: '4.2 Inheritance of One Gene', t: 'Mendel crossed tall and dwarf pea plants to study inheritance of one gene; seeds produced by this cross were grown to generate plants of the first hybrid generation — the Filial1 progeny or F1.' },
    { id: 'o2', topic: '4.2 Inheritance of One Gene', t: 'Fig 4.2 — steps in making a cross in pea: removal of anthers (emasculation) from the female parent, then transfer of pollen (pollination) from the male parent.' },
    { id: 'o3', topic: '4.2 Inheritance of One Gene', t: 'All F1 plants were tall like one parent; none were dwarf. Similar results for other trait pairs: F1 always resembled one parent and the trait of the other parent was not seen.' },
    { id: 'o4', topic: '4.2 Inheritance of One Gene', t: 'On self-pollinating tall F1 plants, some F2 offspring were dwarf — the character not seen in F1 was expressed again. 1/4 of F2 plants were dwarf and 3/4 were tall; F2 tall and dwarf were identical to parental types, no blending.' },
    { id: 'o5', topic: '4.2 Inheritance of One Gene', t: 'In F1 only one parental trait was expressed while in F2 both traits were expressed in the proportion 3:1. Contrasting traits did not show blending at either F1 or F2.' },
    { id: 'o6', topic: '4.2 Inheritance of One Gene', t: 'Mendel proposed that something ("factors") was stably passed down unchanged from parent to offspring through gametes; now called genes. Genes are the units of inheritance and contain information required to express a particular trait.' },
    { id: 'o7', topic: '4.2 Inheritance of One Gene', t: 'Genes which code for a pair of contrasting traits are known as alleles — slightly different forms of the same gene.' },
    { id: 'o8', topic: '4.2 Inheritance of One Gene', t: 'Capital letter is used for the trait expressed at F1 and small letter for the other: T for tall, t for dwarf; possible pairs TT, Tt, tt. (Do not use T and d — hard to tell they are alleles of the same gene.)' },
    { id: 'o9', topic: '4.2 Inheritance of One Gene', t: 'In a true-breeding variety the allelic pair is identical — homozygous (TT, tt). TT/tt/Tt is the genotype; descriptive terms tall/dwarf are the phenotype.' },
    { id: 'o10', topic: '4.2 Inheritance of One Gene', t: 'The F1 heterozygote Tt looks exactly like the TT parent; in a pair of dissimilar factors one dominates (dominant), the other is recessive. T (tallness) is dominant over t (dwarfness).' },
    { id: 'o11', topic: '4.2 Inheritance of One Gene', t: 'Alleles can be similar (homozygotes TT, tt) or dissimilar (heterozygote Tt). Tt plant is heterozygous for one character — a monohybrid; cross between TT and tt is a monohybrid cross.' },
    { id: 'o12', topic: '4.2 Inheritance of One Gene', t: 'During gamete formation by meiosis the alleles of a pair separate (segregate); only one allele is transmitted to a gamete. Segregation is random — 50% chance of a gamete containing either allele.' },
    { id: 'o13', topic: 'Punnett square', t: 'Punnett square, developed by British geneticist Reginald C. Punnett, is a graphical representation to calculate the probability of all possible genotypes of offspring in a genetic cross.' },
    { id: 'o14', topic: 'Punnett square', t: 'Symbols ♀ and ♂ denote female (eggs) and male (pollen). F1 Tt on selfing produces T and t gametes in equal proportion; pollen T has 50% chance to pollinate egg T or t, and so on — random fertilisation.' },
    { id: 'o15', topic: 'Punnett square', t: 'Monohybrid F2: 1/4 TT, 1/2 Tt, 1/4 tt. Phenotypic ratio tall:dwarf = 3:1; genotypic ratio TT:Tt:tt = 1:2:1.' },
    { id: 'o16', topic: 'Punnett square', t: 'The 1/4:1/2:1/4 ratio is condensable to binomial (ax + by)² with gametes T and t each of frequency 1/2: (1/2T + 1/2t)² = 1/4 TT + 1/2 Tt + 1/4 tt.' },
    { id: 'o17', topic: 'Punnett square', t: 'Dwarf F2 plants on selfing continued to produce dwarf plants in F3 and F4 — dwarfs are homozygous tt.' },
    { id: 'o18', topic: 'Test cross', t: 'From phenotype of a dominant trait the genotype (TT or Tt) cannot be known. Test cross: an organism showing dominant phenotype (genotype unknown) is crossed with the recessive parent instead of selfing.' },
    { id: 'o19', topic: 'Test cross', t: 'Fig 4.5 test cross (violet W dominant over white w): if all progeny violet → unknown is homozygous dominant (WW); if half violet and half white (1:1) → unknown is heterozygous (Ww).' },

    /* ---------- Laws ---------- */
    { id: 'l1', topic: '4.2.1 Law of Dominance', t: 'Based on monohybrid crosses Mendel proposed two laws: First law — Law of Dominance; Second law — Law of Segregation.' },
    { id: 'l2', topic: '4.2.1 Law of Dominance', t: 'Law of Dominance: (i) characters are controlled by discrete units called factors; (ii) factors occur in pairs; (iii) in a dissimilar pair one member dominates (dominant) the other (recessive).' },
    { id: 'l3', topic: '4.2.1 Law of Dominance', t: 'Law of dominance explains expression of only one parental character in a monohybrid cross in F1 and expression of both in F2; it also explains the 3:1 proportion at F2.' },
    { id: 'l4', topic: '4.2.2 Law of Segregation', t: 'Law of segregation is based on the fact that alleles do not blend and both characters are recovered as such in F2 though one is not seen in F1. Alleles of a pair segregate during gamete formation; a gamete receives only one of the two factors.' },
    { id: 'l5', topic: '4.2.2 Law of Segregation', t: 'A homozygous parent produces all similar gametes; a heterozygous one produces two kinds of gametes each having one allele in equal proportion.' },

    /* ---------- Incomplete dominance ---------- */
    { id: 'id1', topic: '4.2.2.1 Incomplete Dominance', t: 'Incomplete dominance: F1 has a phenotype that does not resemble either parent and is in between the two. Example — flower colour in dog flower (snapdragon, Antirrhinum sp.).' },
    { id: 'id2', topic: '4.2.2.1 Incomplete Dominance', t: 'Snapdragon: red (RR) × white (rr) → F1 pink (Rr). F2 ratio 1 RR red : 2 Rr pink : 1 rr white — phenotypic and genotypic ratios are both 1:2:1.' },
    { id: 'id3', topic: '4.2.2.1 Incomplete Dominance', t: 'In incomplete dominance the genotypic ratio is exactly as in any Mendelian monohybrid cross, but the phenotypic ratio changes from 3:1 to 1:2:1, because R was not completely dominant over r.' },
    { id: 'd1', topic: 'Concept of dominance', t: 'Every gene contains information to express a particular trait; in a diploid there are two copies (alleles) which need not always be identical, as in a heterozygote; one may be different due to some changes.' },
    { id: 'd2', topic: 'Concept of dominance', t: 'For a gene producing an enzyme for transforming substrate S, the modified allele could produce (i) normal/less efficient enzyme, (ii) non-functional enzyme, or (iii) no enzyme at all.' },
    { id: 'd3', topic: 'Concept of dominance', t: 'If the modified allele makes the same/equivalent product, phenotype is same (such equivalent allele pairs are very common). If it makes a non-functional enzyme or no enzyme, phenotype depends on the unmodified allele.' },
    { id: 'd4', topic: 'Concept of dominance', t: 'The unmodified (functioning) allele, representing the original phenotype, is the dominant allele; the modified allele is generally recessive — recessive trait is seen due to non-functional enzyme or no enzyme.' },

    /* ---------- Co-dominance / ABO ---------- */
    { id: 'cd1', topic: '4.2.2.2 Co-dominance', t: 'In co-dominance the F1 resembles both parents. Example: ABO blood grouping in humans.' },
    { id: 'cd2', topic: '4.2.2.2 Co-dominance', t: 'ABO blood groups are controlled by gene I. Plasma membrane of RBCs has sugar polymers protruding from its surface; the kind of sugar is controlled by gene I.' },
    { id: 'cd3', topic: '4.2.2.2 Co-dominance', t: 'Gene I has three alleles IA, IB and i. IA and IB produce slightly different forms of sugar; i does not produce any sugar. Each person possesses any two of the three alleles.' },
    { id: 'cd4', topic: '4.2.2.2 Co-dominance', t: 'IA and IB are completely dominant over i (IA i → A; IB i → B). When IA and IB are together both express their own sugars — co-dominance — so RBCs have both A and B sugars (AB).' },
    { id: 'cd5', topic: '4.2.2.2 Co-dominance', t: 'Three alleles give six genotypes (IAIA, IAIB, IAi, IBIB, IBi, ii) and four phenotypes/blood groups (A, B, AB, O) — Table 4.2.' },
    { id: 'ma1', topic: 'Multiple alleles', t: 'ABO blood grouping is also an example of multiple alleles — more than two (here three) alleles governing the same character. Since an individual has only two alleles, multiple alleles can be found only when population studies are made.' },
    { id: 'sp1', topic: 'One gene, more than one effect', t: 'Starch synthesis in pea seeds is controlled by one gene with alleles B and b. BB homozygotes synthesise starch effectively, producing large starch grains; bb homozygotes have lesser efficiency and produce smaller starch grains.' },
    { id: 'sp2', topic: 'One gene, more than one effect', t: 'BB seeds are round, bb seeds wrinkled; heterozygotes (Bb) produce round seeds, so B seems dominant. But starch grains in Bb are of intermediate size — if grain size is the phenotype, the alleles show incomplete dominance.' },
    { id: 'sp3', topic: 'One gene, more than one effect', t: 'Dominance is not an autonomous feature of a gene or its product; it depends on the gene product and the particular phenotype chosen for examination, when more than one phenotype is influenced by the same gene.' },

    /* ---------- 4.3 Two genes ---------- */
    { id: 't1', topic: '4.3 Inheritance of Two Genes', t: 'Mendel crossed a pea plant with yellow, round seeds and one with green, wrinkled seeds; F1 seeds were yellow and round — yellow is dominant over green and round over wrinkled.' },
    { id: 't2', topic: '4.3 Inheritance of Two Genes', t: 'Symbols: Y yellow, y green, R round, r wrinkled. Parents RRYY and rryy; gametes RY and ry; F1 hybrid RrYy (dihybrid).' },
    { id: 't3', topic: '4.3 Inheritance of Two Genes', t: 'On selfing F1, 3/4 F2 had yellow and 1/4 green seeds (3:1); round and wrinkled also segregated 3:1 — just like a monohybrid cross.' },
    { id: 't4', topic: '4.3 Inheritance of Two Genes', t: 'Dihybrid F2 phenotypic ratio (Fig 4.7): round yellow 9 : round green 3 : wrinkled yellow 3 : wrinkled green 1 = 9:3:3:1.' },
    { id: 't5', topic: '4.3.1 Law of Independent Assortment', t: 'The 9:3:3:1 ratio is derived as a combination series of 3 yellow : 1 green with 3 round : 1 wrinkled: (3 Round : 1 Wrinkled)(3 Yellow : 1 Green).' },
    { id: 't6', topic: '4.3.1 Law of Independent Assortment', t: 'Law of Independent Assortment: when two pairs of traits are combined in a hybrid, segregation of one pair of characters is independent of the other pair. Based on dihybrid crosses.' },
    { id: 't7', topic: '4.3.1 Law of Independent Assortment', t: 'F1 RrYy produces four types of gametes RY, Ry, rY, ry, each with frequency 25% (1/4); 16 squares in the Punnett square.' },
    { id: 't8', topic: '4.3.1 Law of Independent Assortment', t: 'Dihybrid F2 has 9 genotypes; genotypic ratio is 1:2:1:2:4:2:1:2:1 (not 9:3:3:1).' },

    /* ---------- 4.3.2 Chromosomal theory ---------- */
    { id: 'c1', topic: '4.3.2 Chromosomal Theory of Inheritance', t: 'Mendel published his work in 1865 but it remained unrecognised till 1900 because: communication was not easy; his concept of genes as stable discrete units not blending was not accepted as explanation of apparently continuous variation; his mathematical approach was new and unacceptable; and he could not give physical proof of factors.' },
    { id: 'c2', topic: '4.3.2 Chromosomal Theory of Inheritance', t: 'In 1900 three scientists — de Vries, Correns and von Tschermak — independently rediscovered Mendel\'s results on the inheritance of characters.' },
    { id: 'c3', topic: '4.3.2 Chromosomal Theory of Inheritance', t: 'Advancements in microscopy led to discovery of structures in the nucleus that double and divide before cell division — chromosomes (coloured bodies, as seen by staining). By 1902 chromosome movement during meiosis had been worked out.' },
    { id: 'c4', topic: '4.3.2 Chromosomal Theory of Inheritance', t: 'Walter Sutton and Theodore Boveri noted that the behaviour of chromosomes was parallel to the behaviour of genes and used chromosome movement (Fig 4.8) to explain Mendel\'s laws.' },
    { id: 'c5', topic: '4.3.2 Chromosomal Theory of Inheritance', t: 'Chromosomes as well as genes occur in pairs. The two alleles of a gene pair are located on homologous sites on homologous chromosomes.' },
    { id: 'c6', topic: '4.3.2 Chromosomal Theory of Inheritance', t: 'Table 4.3: both occur in pairs; segregate at gamete formation so only one of each pair goes to a gamete; independent pairs segregate independently of each other. During anaphase of meiosis I the two chromosome pairs can align at the metaphase plate independently (Fig 4.9).' },
    { id: 'c7', topic: '4.3.2 Chromosomal Theory of Inheritance', t: 'Sutton united the knowledge of chromosomal segregation with Mendelian principles and called it the chromosomal theory of inheritance.' },
    { id: 'c8', topic: '4.3.2 Chromosomal Theory of Inheritance', t: 'Experimental verification of the chromosomal theory was done by Thomas Hunt Morgan and colleagues using fruit fly Drosophila melanogaster.' },
    { id: 'c9', topic: '4.3.2 Chromosomal Theory of Inheritance', t: 'Drosophila was suitable: grows on simple synthetic medium; completes life cycle in about two weeks; single mating gives large number of progeny; clear differentiation of sexes; many hereditary variations seen with low-power microscopes.' },

    /* ---------- 4.3.3 Linkage ---------- */
    { id: 'lk1', topic: '4.3.3 Linkage and Recombination', t: 'Morgan carried out dihybrid crosses in Drosophila for sex-linked genes, e.g. yellow-bodied white-eyed females × brown-bodied red-eyed males; the two genes did not segregate independently and F2 ratio deviated significantly from 9:3:3:1.' },
    { id: 'lk2', topic: '4.3.3 Linkage and Recombination', t: 'When two genes were on the same (X) chromosome, the proportion of parental gene combinations was much higher than non-parental types.' },
    { id: 'lk3', topic: '4.3.3 Linkage and Recombination', t: 'Morgan coined the term linkage for the physical association of genes on a chromosome and recombination for the generation of non-parental gene combinations.' },
    { id: 'lk4', topic: '4.3.3 Linkage and Recombination', t: 'Some genes were very tightly linked (very low recombination) while others were loosely linked (higher recombination). White and yellow: 1.3% recombination; white and miniature wing: 37.2% recombination (Fig 4.11).' },
    { id: 'lk5', topic: '4.3.3 Linkage and Recombination', t: 'Fig 4.11: Cross A (y and w) — parental 98.7%, recombinant 1.3%; Cross B (w and m) — parental 62.8%, recombinant 37.2%. Linkage strength between y and w is higher than between w and m.' },
    { id: 'lk6', topic: '4.3.3 Linkage and Recombination', t: 'Morgan\'s student Alfred Sturtevant used frequency of recombination between gene pairs on the same chromosome as a measure of distance between genes and "mapped" their positions. Genetic maps are used as a starting point in sequencing genomes, as in the Human Genome Project.' },

    /* ---------- 4.4 Polygenic ---------- */
    { id: 'pg1', topic: '4.4 Polygenic Inheritance', t: 'Many traits are not distinct alternatives but spread across a gradient — e.g. human height. Such traits are generally controlled by three or more genes — polygenic traits.' },
    { id: 'pg2', topic: '4.4 Polygenic Inheritance', t: 'Polygenic inheritance also takes into account the influence of environment. Human skin colour is a classic example.' },
    { id: 'pg3', topic: '4.4 Polygenic Inheritance', t: 'In a polygenic trait the phenotype reflects the contribution of each allele — the effect of each allele is additive.' },
    { id: 'pg4', topic: '4.4 Polygenic Inheritance', t: 'If genes A, B, C control skin colour (dominant = dark): AABBCC darkest, aabbcc lightest, three dominant + three recessive alleles → intermediate. Number of each type of allele determines darkness.' },

    /* ---------- 4.5 Pleiotropy ---------- */
    { id: 'pl1', topic: '4.5 Pleiotropy', t: 'A single gene that exhibits multiple phenotypic expression is a pleiotropic gene. Mechanism in most cases: effect of a gene on metabolic pathways contributing to different phenotypes.' },
    { id: 'pl2', topic: '4.5 Pleiotropy', t: 'Example: phenylketonuria — caused by mutation in the gene coding for enzyme phenylalanine hydroxylase (single gene mutation); manifests as mental retardation and reduction in hair and skin pigmentation.' },

    /* ---------- 4.6 Sex determination ---------- */
    { id: 'sd1', topic: '4.6 Sex Determination', t: 'Henking (1891) traced a specific nuclear structure through spermatogenesis in a few insects; 50% of sperm received it and 50% did not. He named it the X body but could not explain its significance; it was later found to be a chromosome — the X-chromosome.' },
    { id: 'sd2', topic: '4.6 Sex Determination', t: 'XO type: in many insects all eggs bear an additional X-chromosome besides autosomes; some sperms bear X, some do not. Eggs fertilised by X-bearing sperm become females; by sperm without X become males.' },
    { id: 'sd3', topic: '4.6 Sex Determination', t: 'Due to involvement of X in sex determination it was designated the sex chromosome; the rest are autosomes. Grasshopper is an example of XO type — males have only one X besides autosomes; females have a pair of X.' },
    { id: 'sd4', topic: '4.6 Sex Determination', t: 'XY type (many insects and mammals incl. man): male and female have the same number of chromosomes; males have X and a distinctly smaller Y; females XX. Humans and Drosophila: male XY, female XX (Fig 4.12).' },
    { id: 'sd5', topic: '4.6 Sex Determination', t: 'In both XO and XY types males produce two different types of gametes (with/without X, or X/Y) — male heterogamety.' },
    { id: 'sd6', topic: '4.6 Sex Determination', t: 'In birds the female has two dissimilar sex chromosomes ZW and male has ZZ; total chromosome number is the same in both; females produce two types of gametes — female heterogamety.' },
    { id: 'sd7', topic: '4.6.1 Sex Determination in Humans', t: 'Humans: XY type; of 23 pairs, 22 pairs are autosomes (same in both sexes). Males produce two types of sperm — 50% with X and 50% with Y; females produce only one type of ovum (X).' },
    { id: 'sd8', topic: '4.6.1 Sex Determination in Humans', t: 'Ovum + X sperm → female (XX); ovum + Y sperm → male (XY). The genetic makeup of the sperm determines the sex of the child; each pregnancy has 50% probability of male or female. Blaming women for the sex of the child is a false notion.' },
    { id: 'sd9', topic: '4.6.2 Sex Determination in Honey Bee', t: 'In honey bee, sex is based on the number of sets of chromosomes: fertilised egg (sperm + egg) → female (queen or worker); unfertilised egg → male (drone) by parthenogenesis.' },
    { id: 'sd10', topic: '4.6.2 Sex Determination in Honey Bee', t: 'Female honey bees are diploid (32 chromosomes); males haploid (16). This is haplodiploid sex-determination. Males produce sperms by mitosis; they have no father and cannot have sons, but have a grandfather and can have grandsons.' },

    /* ---------- 4.7 Mutation ---------- */
    { id: 'mu1', topic: '4.7 Mutation', t: 'Mutation is a phenomenon which results in alteration of DNA sequences and consequently changes in genotype and phenotype. Besides recombination, mutation is another phenomenon leading to variation in DNA.' },
    { id: 'mu2', topic: '4.7 Mutation', t: 'Loss (deletion) or gain (insertion/duplication) of a segment of DNA results in alteration in chromosomes — chromosomal abnormalities or aberrations, commonly observed in cancer cells.' },
    { id: 'mu3', topic: '4.7 Mutation', t: 'Mutation due to change in a single base pair of DNA is a point mutation — e.g. sickle cell anaemia. Deletions and insertions of base pairs cause frame-shift mutations.' },
    { id: 'mu4', topic: '4.7 Mutation', t: 'Chemical and physical factors that induce mutations are mutagens; UV radiation is a mutagen.' },

    /* ---------- 4.8 Genetic disorders ---------- */
    { id: 'pa1', topic: '4.8.1 Pedigree Analysis', t: 'Control crosses are not possible in humans; analysis of traits in several generations of a family (family tree) is called pedigree analysis — a strong tool to trace inheritance of a trait, abnormality or disease.' },
    { id: 'pa2', topic: '4.8.1 Pedigree Analysis', t: 'Fig 4.13 pedigree symbols: square = male; circle = female; diamond = sex unspecified; shaded = affected; horizontal line = mating; double line = consanguineous mating (between relatives); number inside symbol (e.g. 5) = five unaffected offspring; children below parents in order of birth left to right.' },
    { id: 'pa3', topic: '4.8.1 Pedigree Analysis', t: 'DNA is the carrier of genetic information and is transmitted from one generation to the next without change; occasional changes (mutations) cause disorders associated with altered genes or chromosomes.' },
    { id: 'md1', topic: '4.8.2 Mendelian Disorders', t: 'Genetic disorders: Mendelian disorders and chromosomal disorders. Mendelian disorders are mainly determined by alteration or mutation in a single gene and follow Mendelian inheritance; traced by pedigree analysis.' },
    { id: 'md2', topic: '4.8.2 Mendelian Disorders', t: 'Common Mendelian disorders: haemophilia, cystic fibrosis, sickle-cell anaemia, colour blindness, phenylketonuria, thalassemia. They may be dominant or recessive, and may be sex-linked (e.g. haemophilia — X-linked recessive, transmitted from carrier female to male progeny).' },
    { id: 'md3', topic: '4.8.2 Mendelian Disorders', t: 'Fig 4.14 pedigrees: (a) autosomal dominant trait — e.g. myotonic dystrophy; (b) autosomal recessive trait — e.g. sickle-cell anaemia.' },
    { id: 'cb1', topic: 'Colour blindness', t: 'Colour blindness is a sex-linked recessive disorder due to defect in red or green cone of eye — failure to discriminate red and green. Caused by mutation in genes on the X chromosome.' },
    { id: 'cb2', topic: 'Colour blindness', t: 'Colour blindness occurs in about 8% of males and only about 0.4% of females, because males have only one X while females have two.' },
    { id: 'cb3', topic: 'Colour blindness', t: 'Son of a woman who carries the gene has a 50% chance of being colour blind. The carrier mother is not colour blind (gene recessive, suppressed by normal allele). A daughter is not normally colour blind unless her mother is a carrier and her father is colour blind.' },
    { id: 'hm1', topic: 'Haemophilia', t: 'Haemophilia: sex-linked recessive disease transmitted from an unaffected carrier female to some of the male progeny. A single protein of the blood-clotting cascade is affected; a simple cut causes non-stop bleeding.' },
    { id: 'hm2', topic: 'Haemophilia', t: 'A heterozygous (carrier) female may transmit haemophilia to sons. A haemophilic female is extremely rare: mother must be at least carrier and father haemophilic (unviable in later stage of life). Queen Victoria\'s pedigree shows many haemophilic descendants as she was a carrier.' },
    { id: 'sc1', topic: 'Sickle-cell anaemia', t: 'Sickle-cell anaemia: autosome-linked recessive trait transmitted when both partners are carriers (heterozygous). Controlled by a single pair of alleles HbA and HbS; only HbS HbS homozygotes show the disease.' },
    { id: 'sc2', topic: 'Sickle-cell anaemia', t: 'Heterozygous HbA HbS individuals appear unaffected but are carriers — 50% probability of transmitting the mutant gene to progeny; they show sickle-cell trait.' },
    { id: 'sc3', topic: 'Sickle-cell anaemia', t: 'Defect: substitution of glutamic acid (Glu) by valine (Val) at the sixth position of the beta globin chain of haemoglobin, due to single base substitution at the sixth codon of beta globin gene from GAG to GUG.' },
    { id: 'sc4', topic: 'Sickle-cell anaemia', t: 'Mutant haemoglobin polymerises under low oxygen tension, changing RBC shape from biconcave disc to elongated sickle-like structure (Fig 4.15: HbA peptide Val-His-Leu-Thr-Pro-Glu-Glu; HbS Val-His-Leu-Thr-Pro-Val-Glu; DNA CTC→CAC, mRNA GAG→GUG).' },
    { id: 'pk1', topic: 'Phenylketonuria', t: 'Phenylketonuria: inborn error of metabolism, autosomal recessive. Affected individual lacks the enzyme that converts phenylalanine into tyrosine.' },
    { id: 'pk2', topic: 'Phenylketonuria', t: 'In PKU phenylalanine accumulates and is converted into phenylpyruvic acid and other derivatives; accumulation in brain → mental retardation; they are excreted in urine due to poor absorption by kidney.' },
    { id: 'th1', topic: 'Thalassemia', t: 'Thalassemia: autosome-linked recessive blood disease transmitted when both partners are unaffected carriers. Mutation or deletion → reduced rate of synthesis of one of the globin chains (α or β) → abnormal haemoglobin → anaemia.' },
    { id: 'th2', topic: 'Thalassemia', t: 'α Thalassemia: production of α globin affected; controlled by two closely linked genes HBA1 and HBA2 on chromosome 16 of each parent; more genes affected → less α globin.' },
    { id: 'th3', topic: 'Thalassemia', t: 'β Thalassemia: production of β globin affected; controlled by a single gene HBB on chromosome 11 of each parent; due to mutation of one or both genes.' },
    { id: 'th4', topic: 'Thalassemia', t: 'Thalassemia is a quantitative problem (synthesising too few globin molecules) while sickle-cell anaemia is a qualitative problem (synthesising an incorrectly functioning globin).' },

    /* ---------- 4.8.3 Chromosomal ---------- */
    { id: 'cr1', topic: '4.8.3 Chromosomal Disorders', t: 'Chromosomal disorders are caused by absence or excess or abnormal arrangement of one or more chromosomes.' },
    { id: 'cr2', topic: '4.8.3 Chromosomal Disorders', t: 'Failure of segregation of chromatids during cell division → gain or loss of chromosome(s) — aneuploidy (e.g. Down\'s syndrome: extra chromosome 21; Turner\'s syndrome: loss of an X in females).' },
    { id: 'cr3', topic: '4.8.3 Chromosomal Disorders', t: 'Failure of cytokinesis after telophase → increase in a whole set of chromosomes — polyploidy; often seen in plants.' },
    { id: 'cr4', topic: '4.8.3 Chromosomal Disorders', t: 'Normal human cell: 46 chromosomes (23 pairs) — 22 pairs autosomes, 1 pair sex chromosomes. An additional copy of a chromosome = trisomy; lack of one of any one pair = monosomy.' },
    { id: 'ds1', topic: 'Down\'s syndrome', t: 'Down\'s syndrome: presence of an additional copy of chromosome 21 (trisomy of 21); first described by Langdon Down (1866).' },
    { id: 'ds2', topic: 'Down\'s syndrome', t: 'Down\'s: short stature with small round head, furrowed tongue, partially open mouth; broad palm with characteristic palm crease; physical, psychomotor and mental development retarded. Fig 4.16 also shows flat back of head, many loops on finger tips, broad flat face, big wrinkled tongue, congenital heart disease.' },
    { id: 'ks1', topic: 'Klinefelter\'s syndrome', t: 'Klinefelter\'s syndrome: additional copy of X chromosome → karyotype 47, XXY. Overall masculine development, but feminine development (breasts — gynaecomastia) also expressed; sterile. Fig 4.17a: tall stature with feminised character.' },
    { id: 'ts1', topic: 'Turner\'s syndrome', t: 'Turner\'s syndrome: absence of one X chromosome — 45 with XO. Such females are sterile as ovaries are rudimentary, and lack other secondary sexual characters. Fig 4.17b: short stature, underdeveloped feminine character.' }
  ],
  qs: []
});
