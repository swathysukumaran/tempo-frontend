import { useState } from "react";
import logo from "../../assets/logo.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Login from "./Login";
import Register from "./Register";
import register from "../../assets/register.jpeg";
import { Clock, Heart, Menu, Sparkles, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import TempoFooter from "./TempoFooter";

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  type DialogContentType = "login" | "register" | null;
  const [dialogContent, setDialogContent] = useState<DialogContentType>(null);

  const openRegisterDialog = () => {
    setDialogContent("register");
  };

  const openLoginDialog = () => {
    setDialogContent("login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container px-4 py-2 min-w-full">
          <div className="flex items-center flex-row justify-between min-w-full">
            <div className="p-2 flex justify-between items-center ">
              <img
                src={logo}
                alt="Tempo"
                className="w-auto h-12 sm:h-16 md:h-20 cursor-pointer"
              />
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Dialog
                open={dialogContent === "login"}
                onOpenChange={() =>
                  dialogContent === "login" && setDialogContent(null)
                }
              >
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={openLoginDialog}>
                    Log in
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white text-gray-900">
                  <DialogHeader>
                    <DialogTitle>Log in to your account</DialogTitle>
                    <DialogDescription>
                      Enter your credentials to log in
                    </DialogDescription>
                  </DialogHeader>
                  <Login />
                </DialogContent>
              </Dialog>
              <Dialog
                open={dialogContent === "register"}
                onOpenChange={() =>
                  dialogContent === "register" && setDialogContent(null)
                }
              >
                <DialogTrigger asChild>
                  <Button onClick={openRegisterDialog} className="text-white">
                    Sign up
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white text-gray-900">
                  <DialogHeader>
                    <DialogTitle>Create an account</DialogTitle>
                    <DialogDescription>
                      Enter your details to register
                    </DialogDescription>
                  </DialogHeader>
                  <Register
                    onLoginClick={() => {
                      setDialogContent("login");
                    }}
                  />
                </DialogContent>
              </Dialog>
            </nav>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#how-it-works"
                  className="text-gray-600 hover:text-gray-900"
                >
                  How It Works
                </a>
                <a
                  href="#features"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Features
                </a>
                <a
                  href="#examples"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Examples
                </a>
                <Dialog
                  open={dialogContent === "login"}
                  onOpenChange={() =>
                    dialogContent === "login" && setDialogContent(null)
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={openLoginDialog}
                    >
                      Log in
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white text-gray-900">
                    <DialogHeader>
                      <DialogTitle>Log in to your account</DialogTitle>
                      <DialogDescription>
                        Enter your credentials to log in
                      </DialogDescription>
                    </DialogHeader>
                    <Login />
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={dialogContent === "register"}
                  onOpenChange={() =>
                    dialogContent === "register" && setDialogContent(null)
                  }
                >
                  <DialogTrigger asChild>
                    <Button className="w-full" onClick={openRegisterDialog}>
                      Sign up
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white text-gray-900">
                    <DialogHeader>
                      <DialogTitle>Create an account</DialogTitle>
                      <DialogDescription>
                        Enter your details to register
                      </DialogDescription>
                    </DialogHeader>
                    <Register />
                  </DialogContent>
                </Dialog>
              </nav>
            </div>
          )}
        </div>
      </header>
      <section>
        <section className="flex flex-col md:flex-row items-center justify-between  mx-auto ">
          <div className="w-full md:w-1/2">
            <img src={register} alt=" a man relaxing on beach" />
          </div>
          <div className="w-full md:w-1/2 p-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Travel at your rhythm
            </h1>
            <p className="text-xl text-gray-600 py-2">
              Discover personalized itineraries powered by AI, designed to match
              your interests, pace, and travel style.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Dialog
                open={dialogContent === "register"}
                onOpenChange={() =>
                  dialogContent === "register" && setDialogContent(null)
                }
              >
                <DialogTrigger asChild>
                  <Button
                    className="text-lg text-white"
                    onClick={openRegisterDialog}
                  >
                    Plan your trip
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white text-gray-900">
                  <DialogHeader>
                    <DialogTitle>Create an account</DialogTitle>
                    <DialogDescription>
                      Enter your details to register
                    </DialogDescription>
                  </DialogHeader>
                  <Register
                    onLoginClick={() => {
                      setDialogContent("login");
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Travel That's Truly Personal
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We don't just recommend popular places—we build experiences
                around your unique travel style.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Preference-Driven</h3>
                  <p className="text-gray-600">
                    Tell us what you love, and we'll match activities,
                    accommodations, and experiences that align with your
                    interests.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    AI-Powered Insights
                  </h3>
                  <p className="text-gray-600">
                    Our AI analyzes thousands of options to find hidden gems and
                    perfect matches that most travel sites miss.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Perfect Pacing</h3>
                  <p className="text-gray-600">
                    We balance your itinerary based on your preferred pace,
                    ensuring you're never rushed or bored.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </section>
      <TempoFooter />
    </div>
  );
}

export default LandingPage;
