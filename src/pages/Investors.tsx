
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Users, DollarSign, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GradientButton from "@/components/ui/GradientButton";

const Investors = () => {
  useEffect(() => {
    // Add grid pattern to body
    document.body.classList.add("bg-grid-pattern");
    
    return () => {
      document.body.classList.remove("bg-grid-pattern");
    };
  }, []);

  // Sample data for charts
  const revenueData = [
    { name: 'Jan', revenue: 12000 },
    { name: 'Feb', revenue: 19000 },
    { name: 'Mar', revenue: 17000 },
    { name: 'Apr', revenue: 21000 },
    { name: 'May', revenue: 24000 },
    { name: 'Jun', revenue: 28000 },
    { name: 'Jul', revenue: 32000 },
    { name: 'Aug', revenue: 38000 },
    { name: 'Sep', revenue: 42000 },
    { name: 'Oct', revenue: 45000 },
    { name: 'Nov', revenue: 48000 },
    { name: 'Dec', revenue: 52000 },
  ];

  const customerData = [
    { name: 'Q1', new: 120, returning: 80 },
    { name: 'Q2', new: 160, returning: 100 },
    { name: 'Q3', new: 180, returning: 140 },
    { name: 'Q4', new: 220, returning: 180 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Investor <span className="gradient-text">Relations</span></h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Explore our financial performance and growth metrics. Dream Team Services 
              is committed to transparency and sustainable growth.
            </p>
          </motion.div>

          <motion.div
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Financial Highlights */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 rounded-xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm">
                  <TrendingUp className="mb-4 text-dts-purple" size={32} />
                  <h3 className="text-2xl font-bold mb-2">$5.2M</h3>
                  <p className="text-foreground/70">Annual Revenue</p>
                </div>
                <div className="p-6 rounded-xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm">
                  <Users className="mb-4 text-dts-purple" size={32} />
                  <h3 className="text-2xl font-bold mb-2">720+</h3>
                  <p className="text-foreground/70">Active Clients</p>
                </div>
                <div className="p-6 rounded-xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm">
                  <DollarSign className="mb-4 text-dts-purple" size={32} />
                  <h3 className="text-2xl font-bold mb-2">42%</h3>
                  <p className="text-foreground/70">YoY Growth</p>
                </div>
              </div>
            </motion.div>

            {/* Revenue Chart */}
            <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6">Annual Revenue Growth</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="name" stroke="#ffffff80" />
                    <YAxis stroke="#ffffff80" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #ffffff20' }}
                      labelStyle={{ color: '#ffffff' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#9b87f5" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Customer Growth Chart */}
            <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6">Customer Growth by Quarter</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="name" stroke="#ffffff80" />
                    <YAxis stroke="#ffffff80" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #ffffff20' }}
                      labelStyle={{ color: '#ffffff' }}
                    />
                    <Legend />
                    <Bar dataKey="new" fill="#1EAEDB" name="New Customers" />
                    <Bar dataKey="returning" fill="#7E69AB" name="Returning Customers" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Reports Section */}
            <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6">Investor Reports</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-foreground/10 rounded-lg hover:bg-dts-blue-light/10 transition-colors">
                  <div>
                    <h3 className="font-medium">2024 Q1 Financial Report</h3>
                    <p className="text-sm text-foreground/70">March 31, 2024</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </Button>
                </div>
                <div className="flex justify-between items-center p-4 border border-foreground/10 rounded-lg hover:bg-dts-blue-light/10 transition-colors">
                  <div>
                    <h3 className="font-medium">2023 Annual Report</h3>
                    <p className="text-sm text-foreground/70">December 31, 2023</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </Button>
                </div>
                <div className="flex justify-between items-center p-4 border border-foreground/10 rounded-lg hover:bg-dts-blue-light/10 transition-colors">
                  <div>
                    <h3 className="font-medium">2023 Q4 Financial Report</h3>
                    <p className="text-sm text-foreground/70">December 31, 2023</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Subscribe Section */}
            <motion.div variants={itemVariants} className="p-8 rounded-2xl border border-foreground/10 bg-dts-blue-dark/40 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6">Stay Updated</h2>
              <p className="text-foreground/70 mb-6">
                Subscribe to our investor newsletter to receive the latest updates on our 
                financial performance, growth metrics, and strategic initiatives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
                <div className="flex-grow">
                  <Input placeholder="Your email address" className="bg-background/10 border-foreground/10" />
                </div>
                <GradientButton>
                  <Mail size={16} className="mr-2" />
                  Subscribe
                </GradientButton>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Investors;
