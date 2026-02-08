import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, MapPin, ArrowRight, Sparkles, Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { motion } from "framer-motion";
import RiskCalculator from "@/components/compliance/RiskCalculator";

const Home = () => {
  const { personalInfo } = useData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <>
      <section className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 50, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] z-0" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-5xl mx-auto text-center"
          >
            {/* Status Indicator */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-8 border border-white/10 backdrop-blur-md shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-foreground/80 tracking-wide">Available for opportunities</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-8xl font-playfair font-bold mb-6 leading-[1.1] tracking-tight text-foreground"
            >
              {personalInfo.name.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  {word}
                </span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="text-xl sm:text-2xl lg:text-3xl font-light text-foreground/80 mb-8 max-w-3xl mx-auto">
              {personalInfo.title}
            </motion.p>

            {/* Status Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-10">
              {personalInfo.badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm px-4 py-2 glass-effect border-white/10 hover:bg-white/5 transition-all duration-300"
                >
                  <Sparkles className="w-3 h-3 mr-2 text-primary" />
                  {badge}
                </Badge>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              {personalInfo.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Button
                variant="default"
                size="lg"
                asChild
                className="group h-14 px-8 text-base rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
              >
                <Link to="/contact">
                  Let's Collaborate
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-14 px-8 text-base rounded-full border-2 hover:bg-muted/50 transition-all duration-300"
              >
                <a href="/CV_Efstathios_Georgopoulos.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 w-5 h-5" />
                  Download CV
                </a>
              </Button>
            </motion.div>

            {/* Quick Navigation Cards */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
            >
              {[
                { to: "/resume", title: "Experience", desc: "My professional journey", icon: FileText },
                { to: "/blog", title: "Insights", desc: "Thoughts on compliance", icon: Sparkles },
                { to: "/contact", title: "Connect", desc: "Let's start a conversation", icon: Linkedin },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-3xl bg-white/5 p-8 border border-white/10 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-4 inline-flex p-3 rounded-2xl bg-white/5 w-fit group-hover:bg-primary/10 transition-colors">
                      <item.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{item.desc}</p>
                    <Link to={item.to} className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      Explore <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Location */}
            <motion.div variants={itemVariants} className="mt-16 text-center">
              <div className="inline-flex items-center text-muted-foreground text-sm font-medium px-6 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span>{personalInfo.location}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Compliance Tech Demo Section */}
      <RiskCalculator />
    </>
  );
};

export default Home;
