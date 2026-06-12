import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/ui/utils";

interface PasswordInputProps extends React.ComponentProps<typeof Input> {
  showStrength?: boolean;
}

function PasswordInput({ className, showStrength = false, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [strength, setStrength] = React.useState<'weak' | 'medium' | 'strong'>('weak');

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    
    if (showStrength) {
      // Calculate strength
      let score = 0;
      if (password.length >= 8) score++;
      if (/[a-z]/.test(password)) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
      
      if (score >= 4) setStrength('strong');
      else if (score >= 2) setStrength('medium');
      else setStrength('weak');
    }
    
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
    }
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
        onChange={handlePasswordChange}
      />
      <button
        type="button"
        onClick={togglePassword}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
      {showStrength && props.value && (
        <div className="mt-2 h-1 w-full rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all ${getStrengthColor()}`}
            style={{
              width: strength === 'weak' ? '33%' : strength === 'medium' ? '66%' : '100%'
            }}
          />
        </div>
      )}
    </div>
  );
}

export { PasswordInput };
